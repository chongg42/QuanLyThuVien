const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng nhập admin
router.post('/admin/login', async (req, res) => {
  try {
    const { tai_khoan, mat_khau } = req.body;

    // Kiểm tra tài khoản
    const [rows] = await pool.query('SELECT * FROM admin WHERE tai_khoan = ?', [tai_khoan]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }

    const admin = rows[0];

    // Kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(mat_khau, admin.mat_khau);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: admin.id, tai_khoan: admin.tai_khoan, vai_tro: admin.vai_tro, role: 'admin' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        admin: {
          id: admin.id,
          tai_khoan: admin.tai_khoan,
          vai_tro: admin.vai_tro
        }
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

// Đăng nhập độc giả
router.post('/user/login', async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    // Kiểm tra tài khoản
    const [rows] = await pool.query('SELECT * FROM doc_gia WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    const docGia = rows[0];

    // Kiểm tra trạng thái
    if (docGia.trang_thai !== 'Hoạt động') {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản đã bị khóa'
      });
    }

    // Kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(mat_khau, docGia.mat_khau);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: docGia.id, email: docGia.email, role: 'user' },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        token,
        user: {
          id: docGia.id,
          ho_ten: docGia.ho_ten,
          email: docGia.email
        }
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

// Đăng ký độc giả
router.post('/user/register', async (req, res) => {
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

    // Tạo tài khoản
    const [result] = await pool.query(
      'INSERT INTO doc_gia (ho_ten, email, so_dien_thoai, dia_chi, mat_khau) VALUES (?, ?, ?, ?, ?)',
      [ho_ten, email, so_dien_thoai, dia_chi, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
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

module.exports = router;
