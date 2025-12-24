const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// Lấy tất cả độc giả
router.get('/', async (req, res) => {
  try {
    const { search, trangThai, page = 1, limit = 10 } = req.query;
    let query = 'SELECT id, ho_ten, email, so_dien_thoai, dia_chi, ngay_dang_ky, trang_thai FROM doc_gia WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (ho_ten LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (trangThai) {
      query += ' AND trang_thai = ?';
      params.push(trangThai);
    }

    query += ' ORDER BY id DESC';

    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Đếm tổng số
    let countQuery = 'SELECT COUNT(*) as total FROM doc_gia WHERE 1=1';
    const countParams = [];
    if (search) {
      countQuery += ' AND (ho_ten LIKE ? OR email LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
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

// Lấy độc giả theo ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, ho_ten, email, so_dien_thoai, dia_chi, ngay_dang_ky, trang_thai FROM doc_gia WHERE id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
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

// Thêm độc giả mới
router.post('/', async (req, res) => {
  try {
    const { ho_ten, email, so_dien_thoai, dia_chi, mat_khau } = req.body;
    
    // Kiểm tra email đã tồn tại
    const [existing] = await pool.query('SELECT id FROM doc_gia WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);
    
    const [result] = await pool.query(
      'INSERT INTO doc_gia (ho_ten, email, so_dien_thoai, dia_chi, mat_khau) VALUES (?, ?, ?, ?, ?)',
      [ho_ten, email, so_dien_thoai, dia_chi, hashedPassword]
    );
    
    res.status(201).json({
      success: true,
      message: 'Thêm độc giả thành công',
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

// Cập nhật độc giả
router.put('/:id', async (req, res) => {
  try {
    const { ho_ten, email, so_dien_thoai, dia_chi, trang_thai } = req.body;
    
    const [result] = await pool.query(
      'UPDATE doc_gia SET ho_ten = ?, email = ?, so_dien_thoai = ?, dia_chi = ?, trang_thai = ? WHERE id = ?',
      [ho_ten, email, so_dien_thoai, dia_chi, trang_thai, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật độc giả thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Xóa độc giả
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM doc_gia WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy độc giả'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa độc giả thành công'
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
