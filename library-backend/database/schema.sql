-- Tạo database
CREATE DATABASE IF NOT EXISTS library_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE library_db;

-- Bảng thể loại sách
CREATE TABLE IF NOT EXISTS the_loai (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng sách
CREATE TABLE IF NOT EXISTS sach (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tieu_de VARCHAR(255) NOT NULL,
    tac_gia VARCHAR(100) NOT NULL,
    the_loai_id INT NOT NULL,
    nha_xuat_ban VARCHAR(100),
    nam_xuat_ban INT,
    so_luong INT DEFAULT 0,
    mo_ta TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (the_loai_id) REFERENCES the_loai(id) ON DELETE RESTRICT,
    INDEX idx_the_loai (the_loai_id),
    INDEX idx_tac_gia (tac_gia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng độc giả
CREATE TABLE IF NOT EXISTS doc_gia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    so_dien_thoai VARCHAR(15),
    dia_chi TEXT,
    ngay_dang_ky DATE DEFAULT (CURRENT_DATE),
    trang_thai ENUM('Hoạt động', 'Tạm khóa') DEFAULT 'Hoạt động',
    mat_khau VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng mượn trả
CREATE TABLE IF NOT EXISTS muon_tra (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doc_gia_id INT NOT NULL,
    sach_id INT NOT NULL,
    ngay_muon DATE NOT NULL,
    han_tra DATE NOT NULL,
    ngay_tra_thuc_te DATE,
    trang_thai ENUM('Đang mượn', 'Đã trả', 'Quá hạn') DEFAULT 'Đang mượn',
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doc_gia_id) REFERENCES doc_gia(id) ON DELETE CASCADE,
    FOREIGN KEY (sach_id) REFERENCES sach(id) ON DELETE CASCADE,
    INDEX idx_doc_gia (doc_gia_id),
    INDEX idx_sach (sach_id),
    INDEX idx_trang_thai (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng yêu cầu đặt sách
CREATE TABLE IF NOT EXISTS yeu_cau_dat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doc_gia_id INT NOT NULL,
    sach_id INT NOT NULL,
    ngay_yeu_cau DATE DEFAULT (CURRENT_DATE),
    trang_thai ENUM('Chờ duyệt', 'Đã duyệt', 'Từ chối') DEFAULT 'Chờ duyệt',
    ghi_chu TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doc_gia_id) REFERENCES doc_gia(id) ON DELETE CASCADE,
    FOREIGN KEY (sach_id) REFERENCES sach(id) ON DELETE CASCADE,
    INDEX idx_doc_gia (doc_gia_id),
    INDEX idx_trang_thai (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng admin
CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tai_khoan VARCHAR(50) UNIQUE NOT NULL,
    mat_khau VARCHAR(255) NOT NULL,
    vai_tro VARCHAR(50) DEFAULT 'Thủ thư',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tai_khoan (tai_khoan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng nhật ký hoạt động
CREATE TABLE IF NOT EXISTS nhat_ky (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thoi_gian DATETIME DEFAULT CURRENT_TIMESTAMP,
    nguoi_dung VARCHAR(100),
    hanh_dong VARCHAR(255),
    chi_tiet TEXT,
    loai ENUM('info', 'success', 'warning', 'danger') DEFAULT 'info',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert dữ liệu mẫu cho thể loại
INSERT INTO the_loai (id, ten) VALUES
(1, 'Công nghệ thông tin'),
(2, 'Văn học'),
(3, 'Ngoại ngữ'),
(4, 'Kỹ năng sống');

-- Insert dữ liệu mẫu cho admin (mật khẩu: 123456)
INSERT INTO admin (tai_khoan, mat_khau, vai_tro) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Quản trị viên'),
('manager', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Nhân viên quản lý'),
('librarian', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Thủ thư');

-- Insert một số sách mẫu
INSERT INTO sach (tieu_de, tac_gia, the_loai_id, nha_xuat_ban, nam_xuat_ban, so_luong, mo_ta) VALUES
('Lập Trình Java Cơ Bản', 'Nguyễn Văn A', 1, 'NXB Giáo Dục', 2020, 12, 'Hướng dẫn các khái niệm cơ bản về ngôn ngữ lập trình Java cho người mới bắt đầu.'),
('Hướng Dẫn HTML & CSS', 'Trần Thị B', 1, 'NXB Thông Tin Truyền Thông', 2019, 7, 'Cuốn sách nền tảng để xây dựng giao diện website chuyên nghiệp.'),
('Cấu Trúc Dữ Liệu & Giải Thuật', 'Lê Minh C', 1, 'NXB Đại Học Quốc Gia', 2021, 5, 'Phân tích các thuật toán quan trọng và cách tối ưu hóa cấu trúc dữ liệu trong lập trình.'),
('Văn Học Việt Nam Hiện Đại', 'Tố Hữu', 2, 'NXB Văn Học', 2015, 20, 'Tổng hợp các tác phẩm văn học tiêu biểu của Việt Nam từ đầu thế kỷ 20 đến nay.'),
('Tiếng Anh Giao Tiếp', 'John Smith', 3, 'NXB Trẻ', 2018, 9, 'Cung cấp các tình huống giao tiếp tiếng Anh thực tế hàng ngày.'),
('Kỹ Năng Sống Cho Sinh Viên', 'Phạm Hương', 4, 'NXB Lao Động', 2017, 14, 'Cẩm nang giúp sinh viên trang bị kỹ năng mềm và thích nghi với môi trường đại học.');
