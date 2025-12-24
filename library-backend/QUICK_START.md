# Hướng dẫn cài đặt nhanh

## Bước 1: Cài đặt Node.js và MySQL

### Node.js
- Tải và cài đặt từ: https://nodejs.org/
- Kiểm tra: `node --version` và `npm --version`

### MySQL
- Tải và cài đặt từ: https://dev.mysql.com/downloads/mysql/
- Hoặc dùng XAMPP: https://www.apachefriends.org/

## Bước 2: Setup Backend

```bash
# Di chuyển vào thư mục backend
cd library-backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
```

## Bước 3: Cấu hình Database

### Chỉnh sửa file .env
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=library_db
DB_PORT=3306

PORT=3000
JWT_SECRET=my_secret_key_123
```

### Tạo database
Mở MySQL Workbench hoặc command line:

```bash
# Đăng nhập MySQL
mysql -u root -p

# Chạy file schema
source database/schema.sql

# Hoặc copy-paste nội dung file schema.sql vào MySQL Workbench và execute
```

Hoặc nếu dùng XAMPP:
1. Mở phpMyAdmin (http://localhost/phpmyadmin)
2. Tạo database mới tên `library_db`
3. Import file `database/schema.sql`

## Bước 4: Chạy Server

```bash
# Development mode (tự động reload khi code thay đổi)
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: **http://localhost:3000**

## Bước 5: Test API

### Cách 1: Dùng trình duyệt
Mở: http://localhost:3000

### Cách 2: Dùng Postman
1. Import file `postman_collection.json` vào Postman
2. Test các endpoint

### Cách 3: Dùng curl
```bash
# Test health check
curl http://localhost:3000/health

# Test login admin
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"tai_khoan":"admin","mat_khau":"123456"}'

# Lấy danh sách sách
curl http://localhost:3000/api/sach
```

## Tài khoản mặc định

### Admin
- Username: `admin`
- Password: `123456`

### Manager
- Username: `manager`
- Password: `123456`

### Librarian
- Username: `librarian`
- Password: `123456`

## Kiểm tra kết nối

### 1. Kiểm tra MySQL đã chạy
```bash
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl status mysql
```

### 2. Kiểm tra port 3000 có sẵn không
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### 3. Kiểm tra log
Khi chạy server, bạn sẽ thấy:
```
✅ Kết nối database thành công!
Server đang chạy tại: http://localhost:3000
```

## Troubleshooting

### Lỗi: Cannot connect to MySQL
- Kiểm tra MySQL đã chạy chưa
- Kiểm tra username/password trong .env
- Kiểm tra port MySQL (mặc định 3306)

### Lỗi: Port 3000 already in use
- Đổi PORT trong .env sang số khác (ví dụ: 3001)
- Hoặc tắt ứng dụng đang dùng port 3000

### Lỗi: Module not found
```bash
# Cài lại dependencies
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Access denied for user
- Kiểm tra lại DB_USER và DB_PASSWORD trong .env
- Đảm bảo user MySQL có quyền truy cập database

## Tích hợp với Frontend

Trong frontend, cấu hình API URL:
```javascript
const API_URL = 'http://localhost:3000/api';

// Ví dụ: Lấy danh sách sách
fetch(`${API_URL}/sach`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## Production Deploy

### 1. Cập nhật .env
```env
NODE_ENV=production
DB_HOST=your_production_host
JWT_SECRET=your_strong_secret_key
```

### 2. Install PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name library-api
pm2 save
pm2 startup
```

### 3. Enable CORS cho domain cụ thể
Sửa file `server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## Backup Database

```bash
# Backup
mysqldump -u root -p library_db > backup.sql

# Restore
mysql -u root -p library_db < backup.sql
```

## Liên hệ hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra log server
2. Kiểm tra log MySQL
3. Tạo issue trên GitHub
