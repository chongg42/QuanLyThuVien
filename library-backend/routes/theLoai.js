const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Lấy tất cả thể loại
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM the_loai ORDER BY id');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Lấy thể loại theo ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM the_loai WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thể loại'
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

// Thêm thể loại mới
router.post('/', async (req, res) => {
  try {
    const { ten } = req.body;
    const [result] = await pool.query('INSERT INTO the_loai (ten) VALUES (?)', [ten]);
    res.status(201).json({
      success: true,
      message: 'Thêm thể loại thành công',
      data: { id: result.insertId, ten }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Cập nhật thể loại
router.put('/:id', async (req, res) => {
  try {
    const { ten } = req.body;
    const [result] = await pool.query('UPDATE the_loai SET ten = ? WHERE id = ?', [ten, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thể loại'
      });
    }
    res.json({
      success: true,
      message: 'Cập nhật thể loại thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// Xóa thể loại
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM the_loai WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thể loại'
      });
    }
    res.json({
      success: true,
      message: 'Xóa thể loại thành công'
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
