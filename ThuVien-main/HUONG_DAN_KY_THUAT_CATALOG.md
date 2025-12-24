# HƯỚNG DẪN KỸ THUẬT - MODULE DANH MỤC SÁCH (USER CATALOG)

Tài liệu này mô tả chi tiết các hàm, chức năng và thư viện được sử dụng trong file `js/user-controller/catalog.js`.

## 1. Tổng Quan
Module Catalog chịu trách nhiệm hiển thị danh sách sách cho độc giả, bao gồm các tính năng:
- **Hiển thị danh sách sách** (có phân trang).
- **Tìm kiếm** theo tên sách hoặc tác giả.
- **Lọc** theo thể loại sách.
- **Xem chi tiết** từng cuốn sách.
- **Lazy Load** (tải trễ) ảnh bìa sách để tối ưu hiệu năng.

---

## 2. Thư Viện & Công Nghệ Sử Dụng

| Tên Thư Viện / API | Mục Đích Sử Dụng | Ghi Chú |
| :--- | :--- | :--- |
| **IntersectionObserver** | Theo dõi khi phần tử xuất hiện trong Viewport để kích hoạt tải ảnh (Lazy Load). | Native Browser API (Không cần cài thêm). |
| **Google Books API** | Lấy ảnh bìa sách tự động dựa trên Tên sách và Tác giả. | Endpoint: `https://www.googleapis.com/books/v1/volumes` |
| **LocalStorage** | Cache (lưu tạm) đường dẫn ảnh bìa đã tải để không phải gọi lại API Google Books nhiều lần. | Key format: `cover_{title}_{author}` |
| **apiAdapter** | Đối tượng trung gian (trong `js/api-adapter.js`) để giao tiếp với Backend server của hệ thống. | Các phương thức: `getBooks`, `getBook`, `getCategories`. |
| **Promise.all** | Thực hiện gọi nhiều API song song (Lấy sách và lấy danh mục) để giảm thời gian chờ. | Native JS |

---

## 3. Chi Tiết Các Hàm

### 3.1. `coverObserver`
- **Loại:** `const (IntersectionObserver)`
- **Mô tả:** Một đối tượng theo dõi (Observer) được cấu hình để phát hiện khi các phần tử có class `.book-cover` cuộn vào vùng nhìn thấy của người dùng (viewport).
- **Hoạt động:** Khi phần tử xuất hiện (ngưỡng 30%), nó sẽ gọi hàm `getBookCover` để lấy ảnh và chèn vào DOM, sau đó ngừng theo dõi phần tử đó.

### 3.2. `getBookCover(title, author)`
- **Loại:** `async function`
- **Mô tả:** Tìm và trả về URL ảnh bìa sách chất lượng tốt nhất có thể tìm thấy.
- **Tham số:**
  - `title` (String): Tên sách.
  - `author` (String): Tên tác giả.
- **Quy trình xử lý:**
  1. Kiểm tra trong `localStorage` xem đã có ảnh của sách này chưa. Nếu có -> Trả về ngay (Cache hit).
  2. Nếu chưa, gọi **Google Books API** với từ khóa: `title + " " + author`.
  3. Lấy URL ảnh thumbnail từ kết quả trả về.
  4. Lưu URL vào `localStorage` phục vụ lần sau.
  5. Trả về URL.

### 3.3. `renderCatalog(page, category, searchQuery)`
- **Loại:** `async function`
- **Mô tả:** Hàm chính để hiển thị giao diện danh mục sách.
- **Tham số:**
  - `page` (Number): Số trang cần tải (Mặc định: 1).
  - `category` (String|Number): ID thể loại cần lọc hoặc 'all' để lấy tất cả.
  - `searchQuery` (String): Từ khóa tìm kiếm.
- **Quy trình xử lý:**
  1. Gọi song song `apiAdapter.getBooks` (lấy danh sách sách theo bộ lọc) và `apiAdapter.getCategories` (lấy danh sách thể loại cho menu lọc).
  2. Tạo chuỗi HTML chứa:
     - Thanh tìm kiếm và bộ lọc thể loại.
     - Grid hiển thị danh sách sách.
     - Thanh phân trang.
  3. Gán HTML vào `#mainContent`.
  4. Gọi `coverObserver.observe()` cho tất cả các phần tử sách vừa render để bắt đầu tính năng lazy load ảnh.

### 3.4. `handleCatalogSearch(category)`
- **Loại:** `function`
- **Mô tả:** Xử lý sự kiện khi người dùng click nút tìm kiếm.
- **Tham số:**
  - `category` (String|Number): ID thể loại hiện đang chọn (để giữ nguyên bộ lọc thể loại khi tìm kiếm).
- **Hoạt động:** Lấy giá trị từ ô input `#catalogSearch` và gọi lại `renderCatalog` với từ khóa đó.

### 3.5. `showBookDetail(id)`
- **Loại:** `async function`
- **Mô tả:** Hiển thị Modal chứa thông tin chi tiết của một cuốn sách.
- **Tham số:**
  - `id` (Number): ID của sách trong cơ sở dữ liệu.
- **Hoạt động:**
  1. Gọi `apiAdapter.getBook(id)` để lấy thông tin chi tiết (Mô tả, Năm XB, v.v.).
  2. Gọi `getBookCover` để lấy ảnh bìa.
  3. Tạo HTML cho Modal (cửa sổ bật lên) và chèn vào cuối thẻ `body`.
  4. Bắt sự kiện đóng Modal.

---
*Tài liệu được tạo tự động bởi Trợ lý AI - Antigravity.*
