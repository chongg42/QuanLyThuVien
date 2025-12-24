const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Lấy tất cả sách (có filter, search, pagination)
router.get('/', async (req, res) => {
  try {
    const { theLoaiId, search, page = 1, limit = 10 } = req.query;
    let query = `
      SELECT s.*, tl.ten as the_loai_ten 
      FROM sach s 
      LEFT JOIN the_loai tl ON s.the_loai_id = tl.id 
      WHERE 1=1
    `;
    const params = [];

    if (theLoaiId) {
      query += ' AND s.the_loai_id = ?';
      params.push(theLoaiId);
    }

    if (search) {
      query += ' AND (s.tieu_de LIKE ? OR s.tac_gia LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY s.id DESC';

    // Pagination
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Đếm tổng số
    let countQuery = 'SELECT COUNT(*) as total FROM sach WHERE 1=1';
    const countParams = [];
    if (theLoaiId) {
      countQuery += ' AND the_loai_id = ?';
      countParams.push(theLoaiId);
    }
    if (search) {
      countQuery += ' AND (tieu_de LIKE ? OR tac_gia LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
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

// Lấy sách theo ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.*, tl.ten as the_loai_ten 
      FROM sach s 
      LEFT JOIN the_loai tl ON s.the_loai_id = tl.id 
      WHERE s.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sách'
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

// Thêm sách mới
router.post('/', async (req, res) => {
  try {
    const { tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO sach (tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta]
    );
    
    res.status(201).json({
      success: true,
      message: 'Thêm sách thành công',
      data: { id: result.insertId }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Cập nhật sách
router.put('/:id', async (req, res) => {
  try {
    const { tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta } = req.body;
    
    const [result] = await pool.query(
      'UPDATE sach SET tieu_de = ?, tac_gia = ?, the_loai_id = ?, nha_xuat_ban = ?, nam_xuat_ban = ?, so_luong = ?, mo_ta = ? WHERE id = ?',
      [tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sách'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật sách thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Xóa sách
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM sach WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sách'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa sách thành công'
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
