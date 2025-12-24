const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Lấy danh sách mượn trả
router.get('/', async (req, res) => {
  try {
    const { docGiaId, sachId, trangThai, page = 1, limit = 10 } = req.query;
    let query = `
      SELECT mt.*, dg.ho_ten as doc_gia_ten, s.tieu_de as sach_ten
      FROM muon_tra mt
      LEFT JOIN doc_gia dg ON mt.doc_gia_id = dg.id
      LEFT JOIN sach s ON mt.sach_id = s.id
      WHERE 1=1
    `;
    const params = [];

    if (docGiaId) {
      query += ' AND mt.doc_gia_id = ?';
      params.push(docGiaId);
    }

    if (sachId) {
      query += ' AND mt.sach_id = ?';
      params.push(sachId);
    }

    if (trangThai) {
      query += ' AND mt.trang_thai = ?';
      params.push(trangThai);
    }

    query += ' ORDER BY mt.id DESC';

    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Đếm tổng số
    let countQuery = 'SELECT COUNT(*) as total FROM muon_tra WHERE 1=1';
    const countParams = [];
    if (docGiaId) {
      countQuery += ' AND doc_gia_id = ?';
      countParams.push(docGiaId);
    }
    if (sachId) {
      countQuery += ' AND sach_id = ?';
      countParams.push(sachId);
    }
    if (trangThai) {
      countQuery += ' AND trang_thai = ?';
      countParams.push(trangThai);
    }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Lấy thông tin mượn trả theo ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT mt.*, dg.ho_ten as doc_gia_ten, dg.email as doc_gia_email, s.tieu_de as sach_ten
      FROM muon_tra mt
      LEFT JOIN doc_gia dg ON mt.doc_gia_id = dg.id
      LEFT JOIN sach s ON mt.sach_id = s.id
      WHERE mt.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn'
      });
    }
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Tạo phiếu mượn sách
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { doc_gia_id, sach_id, ngay_muon, han_tra, ghi_chu } = req.body;

    // Kiểm tra số lượng sách còn
    const [sach] = await connection.query('SELECT so_luong FROM sach WHERE id = ?', [sach_id]);
    if (sach.length === 0 || sach[0].so_luong <= 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Sách không còn hoặc đã hết'
      });
    }

    // Tạo phiếu mượn
    const [result] = await connection.query(
      'INSERT INTO muon_tra (doc_gia_id, sach_id, ngay_muon, han_tra, ghi_chu) VALUES (?, ?, ?, ?, ?)',
      [doc_gia_id, sach_id, ngay_muon, han_tra, ghi_chu]
    );

    // Giảm số lượng sách
    await connection.query('UPDATE sach SET so_luong = so_luong - 1 WHERE id = ?', [sach_id]);

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Tạo phiếu mượn thành công',
      data: { id: result.insertId }
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Trả sách
router.put('/:id/return', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { ngay_tra_thuc_te } = req.body;

    // Lấy thông tin phiếu mượn
    const [muonTra] = await connection.query('SELECT * FROM muon_tra WHERE id = ?', [req.params.id]);
    if (muonTra.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn'
      });
    }

    if (muonTra[0].trang_thai === 'Đã trả') {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Sách đã được trả'
      });
    }

    // Cập nhật trạng thái trả sách
    await connection.query(
      'UPDATE muon_tra SET ngay_tra_thuc_te = ?, trang_thai = ? WHERE id = ?',
      [ngay_tra_thuc_te, 'Đã trả', req.params.id]
    );

    // Tăng số lượng sách
    await connection.query('UPDATE sach SET so_luong = so_luong + 1 WHERE id = ?', [muonTra[0].sach_id]);

    await connection.commit();

    res.json({
      success: true,
      message: 'Trả sách thành công'
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// Cập nhật trạng thái quá hạn
router.put('/:id/overdue', async (req, res) => {
  try {
    const [result] = await pool.query(
      'UPDATE muon_tra SET trang_thai = ? WHERE id = ?',
      ['Quá hạn', req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật trạng thái thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Xóa phiếu mượn
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM muon_tra WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phiếu mượn'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa phiếu mượn thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

module.exports = router;
