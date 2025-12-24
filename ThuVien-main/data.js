// data.js - Bản chuẩn không gây lỗi trùng lặp
if (typeof window.libInitialData === "undefined") {
  window.libInitialData = {
    theLoai: [
      { id: 1, ten: "Công nghệ thông tin" },
      { id: 2, ten: "Văn học" },
      { id: 3, ten: "Ngoại ngữ" },
      { id: 4, ten: "Kỹ năng sống" },
    ],
    sach: [
      {
        id: 1,
        tieuDe: "Lập Trình Java Cơ Bản",
        tacGia: "Nguyễn Văn A",
        theLoaiId: 1,
        nhaXuatBan: "NXB Giáo Dục",
        namXuatBan: 2020,
        soLuong: 12,
        moTa: "Hướng dẫn các khái niệm cơ bản về ngôn ngữ lập trình Java cho người mới bắt đầu.",
      },
      {
        id: 2,
        tieuDe: "Hướng Dẫn HTML & CSS",
        tacGia: "Trần Thị B",
        theLoaiId: 1,
        nhaXuatBan: "NXB Thông Tin Truyền Thông",
        namXuatBan: 2019,
        soLuong: 7,
        moTa: "Cuốn sách nền tảng để xây dựng giao diện website chuyên nghiệp.",
      },
      {
        id: 3,
        tieuDe: "Cấu Trúc Dữ Liệu & Giải Thuật",
        tacGia: "Lê Minh C",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Quốc Gia",
        namXuatBan: 2021,
        soLuong: 5,
        moTa: "Phân tích các thuật toán quan trọng và cách tối ưu hóa cấu trúc dữ liệu trong lập trình.",
      },
      {
        id: 4,
        tieuDe: "Văn Học Việt Nam Hiện Đại",
        tacGia: "Tố Hữu",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2015,
        soLuong: 20,
        moTa: "Tổng hợp các tác phẩm văn học tiêu biểu của Việt Nam từ đầu thế kỷ 20 đến nay.",
      },
      {
        id: 5,
        tieuDe: "Tiếng Anh Giao Tiếp",
        tacGia: "John Smith",
        theLoaiId: 3,
        nhaXuatBan: "NXB Trẻ",
        namXuatBan: 2018,
        soLuong: 9,
        moTa: "Cung cấp các tình huống giao tiếp tiếng Anh thực tế hàng ngày.",
      },
      {
        id: 6,
        tieuDe: "Kỹ Năng Sống Cho Sinh Viên",
        tacGia: "Phạm Hương",
        theLoaiId: 4,
        nhaXuatBan: "NXB Lao Động",
        namXuatBan: 2017,
        soLuong: 14,
        moTa: "Cẩm nang giúp sinh viên trang bị kỹ năng mềm và thích nghi với môi trường đại học.",
      },
      {
        id: 7,
        tieuDe: "Lập Trình Python Cơ Bản",
        tacGia: "Nguyễn Tấn Dũng",
        theLoaiId: 1,
        nhaXuatBan: "NXB Khoa Học Kỹ Thuật",
        namXuatBan: 2021,
        soLuong: 10,
        moTa: "Làm quen với cú pháp đơn giản và sức mạnh của ngôn ngữ Python.",
      },
      {
        id: 8,
        tieuDe: "Lập Trình Web với JavaScript",
        tacGia: "Hoàng Long",
        theLoaiId: 1,
        nhaXuatBan: "NXB Thông Tin Truyền Thông",
        namXuatBan: 2022,
        soLuong: 8,
        moTa: "Hướng dẫn lập trình tương tác trên trang web bằng ngôn ngữ JavaScript.",
      },
      {
        id: 9,
        tieuDe: "ReactJS Nâng Cao",
        tacGia: "Phạm Chí Tài",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Bách Khoa",
        namXuatBan: 2023,
        soLuong: 11,
        moTa: "Đi sâu vào các hooks, state management và tối ưu hóa hiệu năng ứng dụng React.",
      },
      {
        id: 10,
        tieuDe: "NodeJS Cho Người Mới",
        tacGia: "Trần Hữu Nghĩa",
        theLoaiId: 1,
        nhaXuatBan: "NXB Khoa Học Kỹ Thuật",
        namXuatBan: 2020,
        soLuong: 6,
        moTa: "Xây dựng ứng dụng server-side mạnh mẽ với môi trường NodeJS.",
      },
      {
        id: 11,
        tieuDe: "Phân Tích Thiết Kế Hệ Thống",
        tacGia: "Nguyễn Hữu Khoa",
        theLoaiId: 1,
        nhaXuatBan: "NXB Giáo Dục",
        namXuatBan: 2018,
        soLuong: 9,
        moTa: "Quy trình xây dựng và thiết kế kiến trúc cho các hệ thống phần mềm lớn.",
      },
      {
        id: 12,
        tieuDe: "SQL Server Từ Cơ Bản Đến Nâng Cao",
        tacGia: "Lê Văn Minh",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Quốc Gia",
        namXuatBan: 2021,
        soLuong: 16,
        moTa: "Quản trị và truy vấn dữ liệu hiệu quả với Microsoft SQL Server.",
      },
      {
        id: 13,
        tieuDe: "MongoDB Thực Hành",
        tacGia: "Hồ Thanh Sơn",
        theLoaiId: 1,
        nhaXuatBan: "NXB Lao Động",
        namXuatBan: 2019,
        soLuong: 6,
        moTa: "Làm việc với cơ sở dữ liệu NoSQL phổ biến nhất hiện nay thông qua ví dụ thực tế.",
      },
      {
        id: 14,
        tieuDe: "Docker & DevOps",
        tacGia: "Đặng Ngọc Hải",
        theLoaiId: 1,
        nhaXuatBan: "NXB Thế Giới",
        namXuatBan: 2022,
        soLuong: 10,
        moTa: "Tìm hiểu về container hóa và quy trình triển khai phần mềm tự động.",
      },
      {
        id: 15,
        tieuDe: "Lập Trình Kotlin",
        tacGia: "Hoàng Văn Tú",
        theLoaiId: 1,
        nhaXuatBan: "NXB Khoa Học Kỹ Thuật",
        namXuatBan: 2020,
        soLuong: 12,
        moTa: "Ngôn ngữ hiện đại cho phát triển ứng dụng Android.",
      },
      {
        id: 16,
        tieuDe: "Văn Học Trung Đại Việt Nam",
        tacGia: "Nhiều tác giả",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2010,
        soLuong: 18,
        moTa: "Khám phá các áng văn chương cổ điển từ thời Lý - Trần đến hết thế kỷ 19.",
      },
      {
        id: 17,
        tieuDe: "Tác Phẩm Chọn Lọc - Nam Cao",
        tacGia: "Nam Cao",
        theLoaiId: 2,
        nhaXuatBan: "NXB Hội Nhà Văn",
        namXuatBan: 2013,
        soLuong: 22,
        moTa: "Tuyển tập những truyện ngắn hiện thực xuất sắc nhất của nhà văn Nam Cao.",
      },
      {
        id: 18,
        tieuDe: "Tuyển Tập Thơ Xuân Diệu",
        tacGia: "Xuân Diệu",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2014,
        soLuong: 17,
        moTa: "Những vần thơ tình cháy bỏng của 'ông hoàng thơ tình' Việt Nam.",
      },
      {
        id: 19,
        tieuDe: "Tố Tâm",
        tacGia: "Hoàng Ngọc Phách",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2009,
        soLuong: 10,
        moTa: "Tiểu thuyết tâm lý tình cảm đầu tiên của nền văn học hiện đại Việt Nam.",
      },
      {
        id: 20,
        tieuDe: "Dế Mèn Phiêu Lưu Ký",
        tacGia: "Tô Hoài",
        theLoaiId: 2,
        nhaXuatBan: "NXB Kim Đồng",
        namXuatBan: 2011,
        soLuong: 25,
        moTa: "Câu chuyện phiêu lưu đầy thú vị và ý nghĩa dành cho mọi lứa tuổi.",
      },
      {
        id: 21,
        tieuDe: "Ngữ Pháp Tiếng Anh Hiện Đại",
        tacGia: "Raymond Murphy",
        theLoaiId: 3,
        nhaXuatBan: "Cambridge University Press",
        namXuatBan: 2017,
        soLuong: 15,
        moTa: "Hệ thống lại toàn bộ cấu trúc ngữ pháp tiếng Anh từ cơ bản đến nâng cao.",
      },
      {
        id: 22,
        tieuDe: "600 Từ Vựng TOEIC",
        tacGia: "Nhiều tác giả",
        theLoaiId: 3,
        nhaXuatBan: "NXB Phụ Nữ",
        namXuatBan: 2018,
        soLuong: 30,
        moTa: "Danh sách từ vựng thiết yếu nhất để chinh phục kỳ thi TOEIC.",
      },
      {
        id: 23,
        tieuDe: "Tự Học IELTS 7.0",
        tacGia: "Nguyễn Thị Trang",
        theLoaiId: 3,
        nhaXuatBan: "NXB Thế Giới",
        namXuatBan: 2022,
        soLuong: 13,
        moTa: "Lộ trình và bí quyết tự ôn luyện để đạt band điểm cao trong kỳ thi IELTS.",
      },
      {
        id: 24,
        tieuDe: "Tiếng Nhật Sơ Cấp N5",
        tacGia: "Sato Haruki",
        theLoaiId: 3,
        nhaXuatBan: "NXB Trẻ",
        namXuatBan: 2016,
        soLuong: 18,
        moTa: "Bắt đầu hành trình chinh phục tiếng Nhật từ những chữ cái Hiragana đầu tiên.",
      },
      {
        id: 25,
        tieuDe: "Hán Ngữ Tập 1",
        tacGia: "Lý Hạo",
        theLoaiId: 3,
        nhaXuatBan: "NXB Đại Học Quốc Gia",
        namXuatBan: 2015,
        soLuong: 14,
        moTa: "Giáo trình nhập môn tiếng Trung Quốc dành cho người mới.",
      },
      {
        id: 26,
        tieuDe: "Tư Duy Tích Cực",
        tacGia: "Norman Vincent Peale",
        theLoaiId: 4,
        nhaXuatBan: "NXB Tổng Hợp TPHCM",
        namXuatBan: 2012,
        soLuong: 11,
        moTa: "Thay đổi góc nhìn để có cuộc sống hạnh phúc và thành công hơn.",
      },
      {
        id: 27,
        tieuDe: "Đắc Nhân Tâm",
        tacGia: "Dale Carnegie",
        theLoaiId: 4,
        nhaXuatBan: "NXB Trẻ",
        namXuatBan: 2014,
        soLuong: 40,
        moTa: "Cuốn sách kinh điển về nghệ thuật giao tiếp và thu phục lòng người.",
      },
      {
        id: 28,
        tieuDe: "Quẳng Gánh Lo Đi Và Vui Sống",
        tacGia: "Dale Carnegie",
        theLoaiId: 4,
        nhaXuatBan: "NXB Trẻ",
        namXuatBan: 2011,
        soLuong: 22,
        moTa: "Những phương pháp giúp giải tỏa lo âu và tận hưởng cuộc sống hiện tại.",
      },
      {
        id: 29,
        tieuDe: "7 Thói Quen Hiệu Quả",
        tacGia: "Stephen Covey",
        theLoaiId: 4,
        nhaXuatBan: "NXB Tổng Hợp TPHCM",
        namXuatBan: 2013,
        soLuong: 18,
        moTa: "Chiến lược rèn luyện bản thân để đạt được thành công bền vững.",
      },
      {
        id: 30,
        tieuDe: "Nghệ Thuật Giao Tiếp",
        tacGia: "Brian Tracy",
        theLoaiId: 4,
        nhaXuatBan: "NXB Hồng Đức",
        namXuatBan: 2016,
        soLuong: 20,
        moTa: "Cách thức để trở nên tự tin và cuốn hút hơn trong mọi cuộc hội thoại.",
      },
      {
        id: 31,
        tieuDe: "Thuật Toán Java Nâng Cao",
        tacGia: "Trần Đức Hòa",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Bách Khoa",
        namXuatBan: 2019,
        soLuong: 7,
        moTa: "Giải quyết các bài toán phức tạp bằng các thuật toán tối ưu trên nền tảng Java.",
      },
      {
        id: 32,
        tieuDe: "Lập Trình C++ Cho Người Mới",
        tacGia: "Hà Minh Khang",
        theLoaiId: 1,
        nhaXuatBan: "NXB Giáo Dục",
        namXuatBan: 2021,
        soLuong: 9,
        moTa: "Khởi đầu vững chắc với ngôn ngữ lập trình hệ thống C++.",
      },
      {
        id: 33,
        tieuDe: "Hệ Điều Hành Linux",
        tacGia: "Nguyễn Long",
        theLoaiId: 1,
        nhaXuatBan: "NXB Khoa Học Kỹ Thuật",
        namXuatBan: 2017,
        soLuong: 5,
        moTa: "Tìm hiểu kiến trúc lõi và cách làm việc với dòng lệnh Linux.",
      },
      {
        id: 34,
        tieuDe: "Mạng Máy Tính",
        tacGia: "Andrew S. Tanenbaum",
        theLoaiId: 1,
        nhaXuatBan: "NXB Pearson",
        namXuatBan: 2015,
        soLuong: 6,
        moTa: "Giáo trình kinh điển về giao thức mạng và mô hình OSI/TCP-IP.",
      },
      {
        id: 35,
        tieuDe: "Kỹ Thuật Lập Trình",
        tacGia: "Nguyễn Tấn Phước",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Quốc Gia TPHCM",
        namXuatBan: 2018,
        soLuong: 8,
        moTa: "Rèn luyện tư duy logic và phong cách viết code chuyên nghiệp.",
      },
      {
        id: 36,
        tieuDe: "Văn Học Nga Tuyển Chọn",
        tacGia: "Nhiều tác giả",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2008,
        soLuong: 15,
        moTa: "Những kiệt tác văn học Nga phản ánh tâm hồn và lịch sử xứ sở bạch dương.",
      },
      {
        id: 37,
        tieuDe: "Nhật Ký Trong Tù",
        tacGia: "Hồ Chí Minh",
        theLoaiId: 2,
        nhaXuatBan: "NXB Chính Trị Quốc Gia Sự Thật",
        namXuatBan: 2005,
        soLuong: 30,
        moTa: "Tập thơ chữ Hán kiệt tác ghi lại ý chí kiên cường của người chiến sĩ cách mạng.",
      },
      {
        id: 38,
        tieuDe: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        tacGia: "Rosie Nguyễn",
        theLoaiId: 2,
        nhaXuatBan: "NXB Nhã Nam",
        namXuatBan: 2017,
        soLuong: 26,
        moTa: "Khơi dậy đam mê và định hướng bản thân cho những người trẻ đang chênh vênh.",
      },
      {
        id: 39,
        tieuDe: "Nhà Giả Kim",
        tacGia: "Paulo Coelho",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2012,
        soLuong: 22,
        moTa: "Hành trình tìm kiếm vận mệnh và lắng nghe tiếng nói của trái tim.",
      },
      {
        id: 40,
        tieuDe: "Harry Potter Tập 1",
        tacGia: "J.K. Rowling",
        theLoaiId: 2,
        nhaXuatBan: "NXB Trẻ",
        namXuatBan: 2000,
        soLuong: 40,
        moTa: "Bắt đầu cuộc phiêu lưu tại trường phù thủy Hogwarts của cậu bé Harry Potter.",
      },
      {
        id: 41,
        tieuDe: "TOEIC Listening",
        tacGia: "ETS",
        theLoaiId: 3,
        nhaXuatBan: "NXB Nhân Trí Việt",
        namXuatBan: 2019,
        soLuong: 25,
        moTa: "Luyện tập kỹ năng nghe hiểu thông qua các bài test TOEIC thực tế.",
      },
      {
        id: 42,
        tieuDe: "TOEIC Reading",
        tacGia: "ETS",
        theLoaiId: 3,
        nhaXuatBan: "NXB Nhân Trí Việt",
        namXuatBan: 2020,
        soLuong: 21,
        moTa: "Chiến thuật làm bài đọc hiểu TOEIC nhanh chóng và chính xác.",
      },
      {
        id: 43,
        tieuDe: "Tiếng Hàn Tổng Hợp",
        tacGia: "Kim Ji-hoon",
        theLoaiId: 3,
        nhaXuatBan: "NXB Đại Học Quốc Gia",
        namXuatBan: 2015,
        soLuong: 18,
        moTa: "Phát triển toàn diện 4 kỹ năng tiếng Hàn cho người Việt.",
      },
      {
        id: 44,
        tieuDe: "Oxford Picture Dictionary",
        tacGia: "Jayme Adelson-Goldstein",
        theLoaiId: 3,
        nhaXuatBan: "Oxford University Press",
        namXuatBan: 2017,
        soLuong: 14,
        moTa: "Học từ vựng tiếng Anh qua hình ảnh sinh động và dễ nhớ.",
      },
      {
        id: 45,
        tieuDe: "1000 Câu Giao Tiếp Khi Du Lịch",
        tacGia: "Nhiều tác giả",
        theLoaiId: 3,
        nhaXuatBan: "NXB Văn Hóa Thông Tin",
        namXuatBan: 2013,
        soLuong: 19,
        moTa: "Cẩm nang ngôn ngữ bỏ túi cho những chuyến du lịch nước ngoài.",
      },
      {
        id: 46,
        tieuDe: "Tư Duy Phản Biện",
        tacGia: "Nhật Chiêu",
        theLoaiId: 4,
        nhaXuatBan: "NXB Lao Động",
        namXuatBan: 2018,
        soLuong: 16,
        moTa: "Cách rèn luyện óc phân tích và đánh giá vấn đề đa chiều.",
      },
      {
        id: 47,
        tieuDe: "Sức Mạnh Của Thói Quen",
        tacGia: "Charles Duhigg",
        theLoaiId: 4,
        nhaXuatBan: "NXB Nhã Nam",
        namXuatBan: 2012,
        soLuong: 30,
        moTa: "Giải mã cơ chế hình thành thói quen và cách để thay đổi chúng.",
      },
      {
        id: 48,
        tieuDe: "Dám Bị Ghét",
        tacGia: "Ichiro Kishimi",
        theLoaiId: 4,
        nhaXuatBan: "NXB Nhã Nam",
        namXuatBan: 2017,
        soLuong: 22,
        moTa: "Triết lý về sự tự do và hạnh phúc theo quan điểm của tâm lý học Adler.",
      },
      {
        id: 49,
        tieuDe: "Tỉnh Thức",
        tacGia: "Eckhart Tolle",
        theLoaiId: 4,
        nhaXuatBan: "NXB Tổng Hợp TPHCM",
        namXuatBan: 2016,
        soLuong: 18,
        moTa: "Tìm kiếm sự an lạc và sức mạnh từ việc sống trọn vẹn ở giây phút hiện tại.",
      },
      {
        id: 50,
        tieuDe: "Bí Quyết Thành Công",
        tacGia: "Napoleon Hill",
        theLoaiId: 4,
        nhaXuatBan: "NXB Lao Động",
        namXuatBan: 2009,
        soLuong: 12,
        moTa: "Những nguyên tắc vàng giúp bạn đạt được mục tiêu trong sự nghiệp.",
      },
      {
        id: 51,
        tieuDe: "Java Spring Boot Thực Chiến",
        tacGia: "Hoàng Trọng Tín",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Bách Khoa",
        namXuatBan: 2023,
        soLuong: 10,
        moTa: "Hướng dẫn xây dựng microservices và REST API với Spring Boot.",
      },
      {
        id: 52,
        tieuDe: "Lập Trình Web ASP.NET",
        tacGia: "Phạm Thành Danh",
        theLoaiId: 1,
        nhaXuatBan: "NXB Thông Tin Truyền Thông",
        namXuatBan: 2021,
        soLuong: 9,
        moTa: "Phát triển các trang web doanh nghiệp mạnh mẽ trên nền tảng .NET.",
      },
      {
        id: 53,
        tieuDe: "Thuật Toán AI Cơ Bản",
        tacGia: "Đỗ Văn Kiên",
        theLoaiId: 1,
        nhaXuatBan: "NXB Đại Học Quốc Gia",
        namXuatBan: 2022,
        soLuong: 7,
        moTa: "Giới thiệu các mô hình trí tuệ nhân tạo và logic đằng sau chúng.",
      },
      {
        id: 54,
        tieuDe: "Machine Learning Ứng Dụng",
        tacGia: "Lương Minh Khoa",
        theLoaiId: 1,
        nhaXuatBan: "NXB Khoa Học Kỹ Thuật",
        namXuatBan: 2023,
        soLuong: 5,
        moTa: "Triển khai học máy vào các bài toán thực tế như phân loại và dự đoán.",
      },
      {
        id: 55,
        tieuDe: "Khoa Học Dữ Liệu Python",
        tacGia: "Hồ Đức Bảo",
        theLoaiId: 1,
        nhaXuatBan: "NXB Lao Động",
        namXuatBan: 2022,
        soLuong: 10,
        moTa: "Sử dụng Pandas, Numpy để phân tích và xử lý dữ liệu lớn.",
      },
      {
        id: 56,
        tieuDe: "Tuyển Tập Thơ Hàn Mặc Tử",
        tacGia: "Hàn Mặc Tử",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2005,
        soLuong: 12,
        moTa: "Những bài thơ huyền bí, đau thương nhưng đầy tài hoa của Hàn Mặc Tử.",
      },
      {
        id: 57,
        tieuDe: "Chí Phèo - Tác Phẩm Và Bình Luận",
        tacGia: "Nam Cao",
        theLoaiId: 2,
        nhaXuatBan: "NXB Hội Nhà Văn",
        namXuatBan: 2010,
        soLuong: 18,
        moTa: "Tác phẩm văn học hiện thực sâu sắc về bi kịch của người nông dân.",
      },
      {
        id: 58,
        tieuDe: "Sherlock Holmes Tuyển Tập",
        tacGia: "Arthur Conan Doyle",
        theLoaiId: 2,
        nhaXuatBan: "NXB Văn Học",
        namXuatBan: 2006,
        soLuong: 20,
        moTa: "Bộ sưu tập các vụ án ly kỳ của thám tử lừng danh nhất thế giới.",
      },
      {
        id: 59,
        tieuDe: "Kính Vạn Hoa",
        tacGia: "Nguyễn Nhật Ánh",
        theLoaiId: 2,
        nhaXuatBan: "NXB Kim Đồng",
        namXuatBan: 1995,
        soLuong: 30,
        moTa: "Những câu chuyện học trò tinh nghịch và đầy cảm xúc của tuổi thơ.",
      },
      {
        id: 60,
        tieuDe: "Totto-chan Cô Bé Bên Cửa Sổ",
        tacGia: "Tetsuko Kuroyanagi",
        theLoaiId: 2,
        nhaXuatBan: "NXB Kim Đồng",
        namXuatBan: 1981,
        soLuong: 15,
        moTa: "Cuốn sách giáo dục kinh điển về sự tôn trọng và thấu hiểu trẻ em.",
      },
    ],
    docGia: [
      {
        id: 1,
        hoTen: "Nguyễn Văn An",
        email: "an@gmail.com",
        dienThoai: "0901234561",
        matKhau: "123",
      },
      {
        id: 2,
        hoTen: "Trần Hoài Nam",
        email: "nam@gmail.com",
        dienThoai: "0901234562",
        matKhau: "123",
      },
      {
        id: 3,
        hoTen: "Lê Minh Hòa",
        email: "hoa@gmail.com",
        dienThoai: "0901234563",
        matKhau: "123",
      },
      {
        id: 4,
        hoTen: "Phạm Quốc Khánh",
        email: "khanh@gmail.com",
        dienThoai: "0901234564",
        matKhau: "123",
      },
      {
        id: 5,
        hoTen: "Nguyễn Thị Hương",
        email: "huong@gmail.com",
        dienThoai: "0901234565",
        matKhau: "123",
      },
      {
        id: 6,
        hoTen: "Đặng Trọng Phú",
        email: "phu@gmail.com",
        dienThoai: "0901234566",
        matKhau: "123",
      },
      {
        id: 7,
        hoTen: "Lê Thanh Sơn",
        email: "son@gmail.com",
        dienThoai: "0901234567",
        matKhau: "123",
      },
      {
        id: 8,
        hoTen: "Trần Thị Hải",
        email: "hai@gmail.com",
        dienThoai: "0901234568",
        matKhau: "123",
      },
      {
        id: 9,
        hoTen: "Hoàng Nhật Tân",
        email: "tan@gmail.com",
        dienThoai: "0901234569",
        matKhau: "123",
      },
      {
        id: 10,
        hoTen: "Nguyễn Thanh Trúc",
        email: "truc@gmail.com",
        dienThoai: "0901234570",
        matKhau: "123",
      },

      {
        id: 11,
        hoTen: "Phạm Gia Huy",
        email: "huy@gmail.com",
        dienThoai: "0901234571",
        matKhau: "123",
      },
      {
        id: 12,
        hoTen: "Nguyễn Minh Đức",
        email: "duc@gmail.com",
        dienThoai: "0901234572",
        matKhau: "123",
      },
      {
        id: 13,
        hoTen: "Lê Đình Hiếu",
        email: "hieu@gmail.com",
        dienThoai: "0901234573",
        matKhau: "123",
      },
      {
        id: 14,
        hoTen: "Hoàng Thu Trang",
        email: "thu@gmail.com",
        dienThoai: "0901234574",
        matKhau: "123",
      },
      {
        id: 15,
        hoTen: "Nguyễn Quang Minh",
        email: "minh@gmail.com",
        dienThoai: "0901234575",
        matKhau: "123",
      },

      {
        id: 16,
        hoTen: "Phạm Thu Thảo",
        email: "thao@gmail.com",
        dienThoai: "0901234576",
        matKhau: "123",
      },
      {
        id: 17,
        hoTen: "Lê Việt Anh",
        email: "anh@gmail.com",
        dienThoai: "0901234577",
        matKhau: "123",
      },
      {
        id: 18,
        hoTen: "Đỗ Nhật Nam",
        email: "nhatnam@gmail.com",
        dienThoai: "0901234578",
        matKhau: "123",
      },
      {
        id: 19,
        hoTen: "Lương Tiến Đạt",
        email: "dat@gmail.com",
        dienThoai: "0901234579",
        matKhau: "123",
      },
      {
        id: 20,
        hoTen: "Phan Ngọc Dung",
        email: "dung@gmail.com",
        dienThoai: "0901234580",
        matKhau: "123",
      },

      {
        id: 21,
        hoTen: "Hoàng Kim Ngân",
        email: "ngan@gmail.com",
        dienThoai: "0901234581",
        matKhau: "123",
      },
      {
        id: 22,
        hoTen: "Nguyễn Hữu Phước",
        email: "phuoc@gmail.com",
        dienThoai: "0901234582",
        matKhau: "123",
      },
      {
        id: 23,
        hoTen: "Trần Minh Tâm",
        email: "tam@gmail.com",
        dienThoai: "0901234583",
        matKhau: "123",
      },
      {
        id: 24,
        hoTen: "Lê Hải Yến",
        email: "yen@gmail.com",
        dienThoai: "0901234584",
        matKhau: "123",
      },
      {
        id: 25,
        hoTen: "Phạm Đức Toàn",
        email: "toan@gmail.com",
        dienThoai: "0901234585",
        matKhau: "123",
      },
    ],
    muonTra: [
      {
        id: 1,
        docGiaId: 3,
        sachId: 7,
        ngayMuon: "2024-01-03",
        hanTra: "2024-01-20",
        trangThai: "Đang mượn",
      },
      {
        id: 2,
        docGiaId: 5,
        sachId: 12,
        ngayMuon: "2024-01-04",
        hanTra: "2024-01-25",
        trangThai: "Đang mượn",
      },
      {
        id: 3,
        docGiaId: 10,
        sachId: 4,
        ngayMuon: "2024-01-10",
        hanTra: "2024-01-30",
        ngayTraThucTe: "2024-02-13",
        trangThai: "Đã trả",
      },
      {
        id: 4,
        docGiaId: 6,
        sachId: 22,
        ngayMuon: "2024-01-14",
        hanTra: "2024-02-05",
        trangThai: "Đang mượn",
      },
      {
        id: 5,
        docGiaId: 9,
        sachId: 1,
        ngayMuon: "2024-01-15",
        hanTra: "2024-02-01",
        ngayTraThucTe: "2024-02-13",
        trangThai: "Đã trả",
      },
    ],
    yeuCauDat: [
      {
        id: 1,
        docGiaId: 2,
        sachId: 10,
        ngayYeuCau: "2024-02-01",
        trangThai: "Chờ duyệt",
      },
      {
        id: 2,
        docGiaId: 7,
        sachId: 17,
        ngayYeuCau: "2024-02-02",
        trangThai: "Đã duyệt",
      },
      {
        id: 3,
        docGiaId: 12,
        sachId: 8,
        ngayYeuCau: "2024-02-04",
        trangThai: "Từ chối",
      },
      {
        id: 4,
        docGiaId: 14,
        sachId: 33,
        ngayYeuCau: "2024-02-05",
        trangThai: "Chờ duyệt",
      },
      {
        id: 5,
        docGiaId: 18,
        sachId: 41,
        ngayYeuCau: "2024-02-06",
        trangThai: "Đã duyệt",
      },
    ],
    admin: [
      { id: 1, taiKhoan: "admin", matKhau: "123456", vaiTro: "Quản trị viên" },
      {
        id: 2,
        taiKhoan: "manager",
        matKhau: "123456",
        vaiTro: "Nhân viên quản lý",
      },
      { id: 3, taiKhoan: "librarian", matKhau: "123456", vaiTro: "Thủ thư" },
    ],
  };
}

// Khởi tạo vào LocalStorage
if (!localStorage.getItem("libData")) {
  localStorage.setItem("libData", JSON.stringify(window.libInitialData));
}

// Hàm lấy dữ liệu
function getLibData() {
  const data = localStorage.getItem("libData");
  return data ? JSON.parse(data) : window.libInitialData;
}

// Hàm cập nhật dữ liệu
function updateLibData(newData) {
  localStorage.setItem("libData", JSON.stringify(newData));
}
// Thêm vào data.js nếu chưa có
function saveLibData(db) {
  localStorage.setItem("libraryDB", JSON.stringify(db));
}
// data.js - Thêm mảng nhatKy nếu chưa có
if (typeof window.libInitialData.nhatKy === "undefined") {
  window.libInitialData.nhatKy = [
    {
      id: 1,
      thoiGian: "2024-12-18 09:00",
      nguoiDung: "Admin",
      hanhDong: "Thêm sách mới",
      chiTiet: "Đã thêm cuốn 'Lập trình Go'",
      loai: "success",
    },
    {
      id: 2,
      thoiGian: "2024-12-18 10:15",
      nguoiDung: "Admin",
      hanhDong: "Gửi email trễ",
      chiTiet: "Gửi nhắc nhở đến 5 độc giả",
      loai: "warning",
    },
  ];
}

// Hàm thiết lập đồng bộ thời gian thực
function setupRealtimeSync(callback) {
  window.addEventListener("storage", (event) => {
    if (event.key === "libData") {
      console.log(
        "🔄 Phát hiện thay đổi dữ liệu từ tab khác. Đang cập nhật..."
      );
      if (typeof callback === "function") {
        callback(JSON.parse(event.newValue));
      }
    }
  });
}

// Hàm ghi nhật ký (Dùng chung cho toàn hệ thống)
function logActivity(hanhDong, chiTiet, loai = "info") {
  const db = getLibData();
  const now = new Date();
  const timeStr = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;

  // Fix lỗi nếu db.nhatKy chưa tồn tại
  if (!db.nhatKy) db.nhatKy = [];

  const newLog = {
    id: Date.now(),
    thoiGian: timeStr,
    nguoiDung: "Quản trị viên",
    hanhDong: hanhDong,
    chiTiet: chiTiet,
    loai: loai, // success, warning, danger, info
  };

  db.nhatKy.unshift(newLog); // Thêm vào đầu danh sách
  if (db.nhatKy.length > 100) db.nhatKy.pop(); // Giới hạn 100 dòng gần nhất
  updateLibData(db);
}
function showLoanDetail(loanId) {
  const db = getLibData();
  const loan = db.muonTra.find((m) => m.id === loanId);
  if (!loan) return;

  const user = db.docGia.find((u) => u.id === loan.docGiaId);
  const book = db.sach.find((s) => s.id === loan.sachId);

  const detailHTML = `
        <div id="loanDetailModal" class="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in zoom-in duration-300">
            <div class="bg-white rounded-[3rem] p-10 w-full max-w-xl shadow-2xl border border-white">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-black text-slate-900 uppercase">Thông tin <span class="text-emerald-500">Phiếu Trả</span></h3>
                    
                    <button onclick="this.closest('#loanDetailModal').remove()" class="text-slate-400 hover:text-rose-500 transition-colors text-2xl">✕</button>
                </div>
 <p class="text-xs text-slate-400 font-medium">ID:${loan.id}</p>
                <div class="space-y-6 mt-8">
                    <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Người mượn</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">👤</div>
                            <div>
                                <p class="font-black text-slate-800">${
                                  user.hoTen || "Không rõ"
                                }</p>
                                <p class="text-xs text-slate-400 font-medium">Email: ${
                                  user.email || "N/A"
                                }</p>
                                <p class="text-xs text-slate-400 font-medium">ID Độc giả: ${
                                  user.id
                                }</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Sách mượn</p>
                            <p class="font-bold text-slate-800">${
                              book.tieuDe || "N/A"
                            }</p>
                            <p class="text-[10px] text-slate-400 mt-1">ID Sách: ${
                              book.id
                            }</p>
                        </div>
                        <div class="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                            <p class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Trạng thái</p>
                            <span class="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-md shadow-emerald-100">Đã hoàn tất</span>
                        </div>
                    </div>

                    <div class="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-200">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Ngày mượn:</span>
                            <span class="font-mono text-sm">${
                              loan.ngayMuon || "N/A"
                            }</span>
                        </div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] font-bold text-slate-400 uppercase">Hạn trả:</span>
                            <span class="font-mono text-sm">${
                              loan.hanTra
                            }</span>
                        </div>
                        <div class="flex justify-between items-center pt-2 border-t border-slate-800">
                            <span class="text-[10px] font-black text-emerald-400 uppercase">Ngày trả thực tế:</span>
                            <span class="font-mono font-black text-emerald-400 text-lg">${
                              loan.ngayTraThucTe || "N/A"
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", detailHTML);
}
/* ==================================================
   🔥 FUZZY SEARCH – THÊM MỚI (NOTE)
================================================== */

// Chuẩn hóa tiếng Việt
function normalizeText(str) {
    return str
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

// Tính điểm giống nhau
function fuzzyScore(book, keyword) {
    if (!keyword) return 1;

    const text = normalizeText(
        Object.values(book).join(" ")
    );

    const words = normalizeText(keyword).split(/\s+/);
    let score = 0;

    words.forEach(word => {
        if (text.includes(word)) score++;
    });

    return score;
}