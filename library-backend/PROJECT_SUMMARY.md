# Library Management System - Backend API

## 📦 Tổng quan dự án

Backend đơn giản cho hệ thống quản lý thư viện được xây dựng với:
- **Node.js** + **Express.js** - Framework backend
- **MySQL** - Database
- **JWT** - Xác thực người dùng
- **bcryptjs** - Mã hóa mật khẩu

## 🗂️ Cấu trúc Database

### 1. **the_loai** (Thể loại sách)
```sql
- id (INT, PRIMARY KEY)
- ten (VARCHAR)
- created_at, updated_at
```

### 2. **sach** (Sách)
```sql
- id (INT, PRIMARY KEY)
- tieu_de (VARCHAR)
- tac_gia (VARCHAR)
- the_loai_id (INT, FOREIGN KEY -> the_loai)
- nha_xuat_ban (VARCHAR)
- nam_xuat_ban (INT)
- so_luong (INT)
- mo_ta (TEXT)
- created_at, updated_at
```

### 3. **doc_gia** (Độc giả)
```sql
- id (INT, PRIMARY KEY)
- ho_ten (VARCHAR)
- email (VARCHAR, UNIQUE)
- so_dien_thoai (VARCHAR)
- dia_chi (TEXT)
- ngay_dang_ky (DATE)
- trang_thai (ENUM: 'Hoạt động', 'Tạm khóa')
- mat_khau (VARCHAR - hashed)
- created_at, updated_at
```

### 4. **muon_tra** (Mượn trả sách)
```sql
- id (INT, PRIMARY KEY)
- doc_gia_id (INT, FOREIGN KEY -> doc_gia)
- sach_id (INT, FOREIGN KEY -> sach)
- ngay_muon (DATE)
- han_tra (DATE)
- ngay_tra_thuc_te (DATE)
- trang_thai (ENUM: 'Đang mượn', 'Đã trả', 'Quá hạn')
- ghi_chu (TEXT)
- created_at, updated_at
```

### 5. **yeu_cau_dat** (Yêu cầu đặt sách)
```sql
- id (INT, PRIMARY KEY)
- doc_gia_id (INT, FOREIGN KEY)
- sach_id (INT, FOREIGN KEY)
- ngay_yeu_cau (DATE)
- trang_thai (ENUM: 'Chờ duyệt', 'Đã duyệt', 'Từ chối')
- ghi_chu (TEXT)
- created_at, updated_at
```

### 6. **admin** (Quản trị viên)
```sql
- id (INT, PRIMARY KEY)
- tai_khoan (VARCHAR, UNIQUE)
- mat_khau (VARCHAR - hashed)
- vai_tro (VARCHAR)
- created_at, updated_at
```

### 7. **nhat_ky** (Nhật ký hoạt động)
```sql
- id (INT, PRIMARY KEY)
- thoi_gian (DATETIME)
- nguoi_dung (VARCHAR)
- hanh_dong (VARCHAR)
- chi_tiet (TEXT)
- loai (ENUM: 'info', 'success', 'warning', 'danger')
- created_at
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/admin/login      - Đăng nhập admin
POST   /api/auth/user/login       - Đăng nhập độc giả
POST   /api/auth/user/register    - Đăng ký độc giả
```

### Thể loại (Categories)
```
GET    /api/the-loai              - Lấy tất cả thể loại
GET    /api/the-loai/:id          - Lấy thể loại theo ID
POST   /api/the-loai              - Thêm thể loại mới
PUT    /api/the-loai/:id          - Cập nhật thể loại
DELETE /api/the-loai/:id          - Xóa thể loại
```

### Sách (Books)
```
GET    /api/sach                  - Lấy danh sách sách (có filter, search, pagination)
GET    /api/sach/:id              - Lấy sách theo ID
POST   /api/sach                  - Thêm sách mới
PUT    /api/sach/:id              - Cập nhật sách
DELETE /api/sach/:id              - Xóa sách

Query params:
- theLoaiId: Filter theo thể loại
- search: Tìm kiếm theo tiêu đề hoặc tác giả
- page: Số trang (default: 1)
- limit: Số item/trang (default: 10)
```

### Độc giả (Readers)
```
GET    /api/doc-gia               - Lấy danh sách độc giả
GET    /api/doc-gia/:id           - Lấy độc giả theo ID
POST   /api/doc-gia               - Thêm độc giả mới
PUT    /api/doc-gia/:id           - Cập nhật độc giả
DELETE /api/doc-gia/:id           - Xóa độc giả

Query params:
- search: Tìm kiếm theo họ tên hoặc email
- trangThai: Filter theo trạng thái
- page, limit: Pagination
```

### Mượn trả (Loans)
```
GET    /api/muon-tra              - Lấy danh sách mượn trả
GET    /api/muon-tra/:id          - Lấy thông tin mượn trả theo ID
POST   /api/muon-tra              - Tạo phiếu mượn sách
PUT    /api/muon-tra/:id/return   - Trả sách
PUT    /api/muon-tra/:id/overdue  - Cập nhật trạng thái quá hạn
DELETE /api/muon-tra/:id          - Xóa phiếu mượn

Query params:
- docGiaId: Filter theo độc giả
- sachId: Filter theo sách
- trangThai: Filter theo trạng thái
- page, limit: Pagination
```

## ✨ Tính năng chính

### 1. **Xác thực & Phân quyền**
- JWT-based authentication
- Mã hóa mật khẩu với bcrypt
- Phân quyền Admin/User

### 2. **Quản lý Sách**
- CRUD đầy đủ
- Tìm kiếm và lọc theo thể loại
- Pagination
- Theo dõi số lượng sách

### 3. **Quản lý Mượn Trả**
- Tạo phiếu mượn
- Tự động giảm/tăng số lượng sách
- Theo dõi trạng thái (Đang mượn, Đã trả, Quá hạn)
- Transaction để đảm bảo data integrity

### 4. **Quản lý Độc giả**
- Đăng ký tài khoản
- Quản lý thông tin
- Khóa/Mở khóa tài khoản

### 5. **API Features**
- RESTful design
- Error handling
- Request logging
- CORS enabled
- Response pagination

## 📁 Cấu trúc thư mục

```
library-backend/
├── config/
│   └── database.js              # Cấu hình MySQL connection pool
│
├── database/
│   └── schema.sql               # SQL script tạo database & tables
│
├── middleware/
│   └── auth.js                  # JWT authentication middleware
│
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   ├── theLoai.js              # Category management
│   ├── sach.js                 # Book management
│   ├── docGia.js               # Reader management
│   └── muonTra.js              # Loan management
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # NPM dependencies
├── server.js                    # Main application file
├── README.md                    # Full documentation
├── QUICK_START.md              # Quick setup guide
└── postman_collection.json     # Postman API collection
```

## 🚀 Hướng dẫn cài đặt nhanh

### 1. Yêu cầu hệ thống
- Node.js >= 14.x
- MySQL >= 5.7
- npm hoặc yarn

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình .env
```bash
cp .env.example .env
# Chỉnh sửa thông tin database trong .env
```

### 4. Tạo database
```bash
mysql -u root -p < database/schema.sql
```

### 5. Chạy server
```bash
npm run dev  # Development
npm start    # Production
```

## 🔐 Tài khoản mặc định

### Admin
- Username: `admin`
- Password: `123456`
- Role: Quản trị viên

### Manager
- Username: `manager`
- Password: `123456`
- Role: Nhân viên quản lý

### Librarian
- Username: `librarian`
- Password: `123456`
- Role: Thủ thư

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Thông báo lỗi",
  "error": "Chi tiết lỗi (chỉ trong development mode)"
}
```

## 🔄 Workflow Mượn Sách

1. **Tạo phiếu mượn** (`POST /api/muon-tra`)
   - Kiểm tra sách còn không
   - Tạo record trong bảng muon_tra
   - Giảm số lượng sách (transaction)

2. **Trả sách** (`PUT /api/muon-tra/:id/return`)
   - Cập nhật ngày trả thực tế
   - Đổi trạng thái sang "Đã trả"
   - Tăng số lượng sách (transaction)

3. **Cập nhật quá hạn** (`PUT /api/muon-tra/:id/overdue`)
   - Đổi trạng thái sang "Quá hạn"

## 🔍 Ví dụ Request

### Đăng nhập Admin
```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "tai_khoan": "admin",
    "mat_khau": "123456"
  }'
```

### Lấy danh sách sách
```bash
curl http://localhost:3000/api/sach?page=1&limit=10&search=java
```

### Tạo phiếu mượn
```bash
curl -X POST http://localhost:3000/api/muon-tra \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "doc_gia_id": 1,
    "sach_id": 5,
    "ngay_muon": "2024-12-24",
    "han_tra": "2025-01-24"
  }'
```

## 📝 Notes

- Mật khẩu được mã hóa bằng bcrypt (10 rounds)
- JWT token hết hạn sau 24 giờ
- Pagination mặc định: page=1, limit=10
- CORS được enable cho tất cả origins (development)
- Error logs được in ra console
- Transaction được dùng cho mượn/trả sách

## 🔧 Troubleshooting

### Không kết nối được MySQL
- Kiểm tra MySQL service đang chạy
- Kiểm tra thông tin trong .env
- Kiểm tra firewall/port 3306

### Port 3000 đã được sử dụng
- Đổi PORT trong .env
- Hoặc kill process đang dùng port 3000

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Technologies Used

- **Express.js** - Web framework
- **mysql2** - MySQL driver với Promise support
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables management

## 🎯 Future Enhancements

- [ ] Upload ảnh bìa sách
- [ ] Gửi email nhắc nhở quá hạn
- [ ] Thống kê dashboard
- [ ] Export báo cáo Excel/PDF
- [ ] Real-time notifications
- [ ] Rate limiting
- [ ] API documentation với Swagger
- [ ] Unit tests
- [ ] Docker containerization

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.
