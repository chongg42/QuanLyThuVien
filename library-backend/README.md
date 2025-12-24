# Library Management System - Backend API

Backend đơn giản cho hệ thống quản lý thư viện sử dụng Node.js, Express và MySQL.

## Yêu cầu hệ thống

- Node.js >= 14.x
- MySQL >= 5.7
- npm hoặc yarn

## Cài đặt

### 1. Clone hoặc tải project

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình database

Tạo file `.env` từ file `.env.example`:

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin database của bạn:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=library_db
DB_PORT=3306

PORT=3000
NODE_ENV=development

JWT_SECRET=your_secret_key_change_this_in_production
```

### 4. Tạo database

Chạy file SQL để tạo database và bảng:

```bash
mysql -u root -p < database/schema.sql
```

Hoặc import thủ công:
1. Mở MySQL Workbench hoặc phpMyAdmin
2. Mở file `database/schema.sql`
3. Chạy toàn bộ script

### 5. Chạy server

Development mode (với nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:3000`

## Cấu trúc thư mục

```
library-backend/
├── config/
│   └── database.js          # Cấu hình kết nối database
├── database/
│   └── schema.sql           # Script tạo database
├── middleware/
│   └── auth.js              # Middleware xác thực
├── routes/
│   ├── auth.js              # Routes đăng nhập/đăng ký
│   ├── theLoai.js           # Routes thể loại sách
│   ├── sach.js              # Routes sách
│   ├── docGia.js            # Routes độc giả
│   └── muonTra.js           # Routes mượn trả sách
├── .env.example             # File cấu hình mẫu
├── package.json
├── server.js                # File chính
└── README.md
```

## API Endpoints

### Authentication

#### Đăng nhập Admin
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "tai_khoan": "admin",
  "mat_khau": "123456"
}
```

#### Đăng nhập Độc giả
```http
POST /api/auth/user/login
Content-Type: application/json

{
  "email": "user@example.com",
  "mat_khau": "password"
}
```

#### Đăng ký Độc giả
```http
POST /api/auth/user/register
Content-Type: application/json

{
  "ho_ten": "Nguyễn Văn A",
  "email": "user@example.com",
  "so_dien_thoai": "0123456789",
  "dia_chi": "Hà Nội",
  "mat_khau": "password"
}
```

### Thể loại

#### Lấy tất cả thể loại
```http
GET /api/the-loai
```

#### Lấy thể loại theo ID
```http
GET /api/the-loai/:id
```

#### Thêm thể loại mới
```http
POST /api/the-loai
Content-Type: application/json

{
  "ten": "Khoa học"
}
```

#### Cập nhật thể loại
```http
PUT /api/the-loai/:id
Content-Type: application/json

{
  "ten": "Khoa học tự nhiên"
}
```

#### Xóa thể loại
```http
DELETE /api/the-loai/:id
```

### Sách

#### Lấy danh sách sách (có filter, search, pagination)
```http
GET /api/sach?theLoaiId=1&search=java&page=1&limit=10
```

#### Lấy sách theo ID
```http
GET /api/sach/:id
```

#### Thêm sách mới
```http
POST /api/sach
Content-Type: application/json

{
  "tieu_de": "Lập trình Python",
  "tac_gia": "Nguyễn Văn A",
  "the_loai_id": 1,
  "nha_xuat_ban": "NXB Giáo Dục",
  "nam_xuat_ban": 2024,
  "so_luong": 10,
  "mo_ta": "Sách học lập trình Python"
}
```

#### Cập nhật sách
```http
PUT /api/sach/:id
Content-Type: application/json

{
  "tieu_de": "Lập trình Python nâng cao",
  "tac_gia": "Nguyễn Văn A",
  "the_loai_id": 1,
  "nha_xuat_ban": "NXB Giáo Dục",
  "nam_xuat_ban": 2024,
  "so_luong": 15,
  "mo_ta": "Sách học lập trình Python nâng cao"
}
```

#### Xóa sách
```http
DELETE /api/sach/:id
```

### Độc giả

#### Lấy danh sách độc giả
```http
GET /api/doc-gia?search=nguyen&trangThai=Hoạt động&page=1&limit=10
```

#### Lấy độc giả theo ID
```http
GET /api/doc-gia/:id
```

#### Thêm độc giả mới
```http
POST /api/doc-gia
Content-Type: application/json

{
  "ho_ten": "Nguyễn Văn B",
  "email": "user2@example.com",
  "so_dien_thoai": "0987654321",
  "dia_chi": "Hà Nội",
  "mat_khau": "password123"
}
```

#### Cập nhật độc giả
```http
PUT /api/doc-gia/:id
Content-Type: application/json

{
  "ho_ten": "Nguyễn Văn B",
  "email": "user2@example.com",
  "so_dien_thoai": "0987654321",
  "dia_chi": "Hà Nội",
  "trang_thai": "Hoạt động"
}
```

#### Xóa độc giả
```http
DELETE /api/doc-gia/:id
```

### Mượn trả sách

#### Lấy danh sách mượn trả
```http
GET /api/muon-tra?docGiaId=1&trangThai=Đang mượn&page=1&limit=10
```

#### Lấy thông tin mượn trả theo ID
```http
GET /api/muon-tra/:id
```

#### Tạo phiếu mượn sách
```http
POST /api/muon-tra
Content-Type: application/json

{
  "doc_gia_id": 1,
  "sach_id": 5,
  "ngay_muon": "2024-12-24",
  "han_tra": "2025-01-24",
  "ghi_chu": "Ghi chú"
}
```

#### Trả sách
```http
PUT /api/muon-tra/:id/return
Content-Type: application/json

{
  "ngay_tra_thuc_te": "2025-01-20"
}
```

#### Cập nhật trạng thái quá hạn
```http
PUT /api/muon-tra/:id/overdue
```

#### Xóa phiếu mượn
```http
DELETE /api/muon-tra/:id
```

## Cấu trúc Database

### Bảng `the_loai`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `ten` (VARCHAR(100))
- `created_at`, `updated_at` (TIMESTAMP)

### Bảng `sach`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `tieu_de` (VARCHAR(255))
- `tac_gia` (VARCHAR(100))
- `the_loai_id` (INT, FOREIGN KEY)
- `nha_xuat_ban` (VARCHAR(100))
- `nam_xuat_ban` (INT)
- `so_luong` (INT)
- `mo_ta` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)

### Bảng `doc_gia`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `ho_ten` (VARCHAR(100))
- `email` (VARCHAR(100), UNIQUE)
- `so_dien_thoai` (VARCHAR(15))
- `dia_chi` (TEXT)
- `ngay_dang_ky` (DATE)
- `trang_thai` (ENUM: 'Hoạt động', 'Tạm khóa')
- `mat_khau` (VARCHAR(255))
- `created_at`, `updated_at` (TIMESTAMP)

### Bảng `muon_tra`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `doc_gia_id` (INT, FOREIGN KEY)
- `sach_id` (INT, FOREIGN KEY)
- `ngay_muon` (DATE)
- `han_tra` (DATE)
- `ngay_tra_thuc_te` (DATE)
- `trang_thai` (ENUM: 'Đang mượn', 'Đã trả', 'Quá hạn')
- `ghi_chu` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)

### Bảng `admin`
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `tai_khoan` (VARCHAR(50), UNIQUE)
- `mat_khau` (VARCHAR(255))
- `vai_tro` (VARCHAR(50))
- `created_at`, `updated_at` (TIMESTAMP)

## Tài khoản mặc định

### Admin
- Tài khoản: `admin`
- Mật khẩu: `123456`
- Vai trò: Quản trị viên

### Manager
- Tài khoản: `manager`
- Mật khẩu: `123456`
- Vai trò: Nhân viên quản lý

### Librarian
- Tài khoản: `librarian`
- Mật khẩu: `123456`
- Vai trò: Thủ thư

## Tính năng chính

✅ RESTful API đầy đủ
✅ Xác thực JWT
✅ Mã hóa mật khẩu với bcrypt
✅ Pagination cho các danh sách
✅ Search và filter
✅ Transaction cho mượn/trả sách
✅ CORS enabled
✅ Error handling
✅ Request logging

## Lưu ý

- Nhớ thay đổi `JWT_SECRET` trong file `.env` khi deploy production
- Backup database thường xuyên
- Kiểm tra log để debug
- Cấu hình CORS phù hợp với domain frontend

## Support

Nếu có vấn đề, vui lòng tạo issue trên repository hoặc liên hệ qua email.

## License

MIT
