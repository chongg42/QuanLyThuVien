const jwt = require('jsonwebtoken');

// Middleware xác thực token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Không tìm thấy token xác thực' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token không hợp lệ hoặc đã hết hạn' 
    });
  }
};

// Middleware kiểm tra quyền admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      success: false, 
      message: 'Không có quyền truy cập' 
    });
  }
};

module.exports = { authMiddleware, adminMiddleware };
