const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Import routes
const authRoutes = require('./routes/auth');
const theLoaiRoutes = require('./routes/theLoai');
const sachRoutes = require('./routes/sach');
const docGiaRoutes = require('./routes/docGia');
const muonTraRoutes = require('./routes/muonTra');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/the-loai', theLoaiRoutes);
app.use('/api/sach', sachRoutes);
app.use('/api/doc-gia', docGiaRoutes);
app.use('/api/muon-tra', muonTraRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Library Management System API',
    version: '1.0.0',
    endpoints: {
      auth: {
        adminLogin: 'POST /api/auth/admin/login',
        userLogin: 'POST /api/auth/user/login',
        userRegister: 'POST /api/auth/user/register'
      },
      theLoai: {
        getAll: 'GET /api/the-loai',
        getById: 'GET /api/the-loai/:id',
        create: 'POST /api/the-loai',
        update: 'PUT /api/the-loai/:id',
        delete: 'DELETE /api/the-loai/:id'
      },
      sach: {
        getAll: 'GET /api/sach',
        getById: 'GET /api/sach/:id',
        create: 'POST /api/sach',
        update: 'PUT /api/sach/:id',
        delete: 'DELETE /api/sach/:id'
      },
      docGia: {
        getAll: 'GET /api/doc-gia',
        getById: 'GET /api/doc-gia/:id',
        create: 'POST /api/doc-gia',
        update: 'PUT /api/doc-gia/:id',
        delete: 'DELETE /api/doc-gia/:id'
      },
      muonTra: {
        getAll: 'GET /api/muon-tra',
        getById: 'GET /api/muon-tra/:id',
        create: 'POST /api/muon-tra',
        return: 'PUT /api/muon-tra/:id/return',
        updateOverdue: 'PUT /api/muon-tra/:id/overdue',
        delete: 'DELETE /api/muon-tra/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Đã có lỗi xảy ra',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Library Management System API                       ║
║                                                           ║
║   Server đang chạy tại: http://localhost:${PORT}         ║
║   Môi trường: ${process.env.NODE_ENV || 'development'}              ║
║                                                           ║
║   📚 API Endpoints:                                       ║
║   - Health Check: GET /health                            ║
║   - API Docs: GET /                                      ║
║   - Auth: /api/auth                                      ║
║   - Thể loại: /api/the-loai                             ║
║   - Sách: /api/sach                                      ║
║   - Độc giả: /api/doc-gia                               ║
║   - Mượn trả: /api/muon-tra                             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
