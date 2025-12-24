// js/user-controller/cart.js

// 1. Lấy danh sách ID sách từ localStorage
function getCartItems() {
  const userId = getCurrentUserId();
  if (!userId) return [];
  const cart = localStorage.getItem(`libra_cart_${userId}`);
  return cart ? JSON.parse(cart) : [];
}
function getCurrentUserId() {
  const user = localStorage.getItem("libra_login");
  return user ? JSON.parse(user).id : null;
}
// 2. Hàm Thêm vào giỏ (Dùng cho catalog.js gọi tới)
function addToCart(bookId) {
  let cart = getCartItems();
const userId = getCurrentUserId();
  // Kiểm tra xem sách đã có trong giỏ chưa
  if (!cart.includes(bookId)) {
    cart.push(bookId);
    localStorage.setItem(`libra_cart_${userId}`, JSON.stringify(cart));

    // Cập nhật số lượng hiển thị trên icon giỏ hàng (nếu có)
    updateCartBadge();
    alert("✅ Đã thêm sách vào giỏ hàng!");
  } else {
    alert("ℹ️ Sách này đã có trong giỏ hàng.");
  }
}

// 3. Hàm Xóa một cuốn sách khỏi giỏ
function removeFromCart(bookId) {
  const userId = getCurrentUserId();
  let cart = getCartItems();
  cart = cart.filter((id) => id !== bookId);
  localStorage.setItem(`libra_cart_${userId}`, JSON.stringify(cart));

  // Render lại giao diện giỏ hàng
  renderCart();
  updateCartBadge();
}

// 4. Hàm render giao diện Giỏ hàng
function renderCart() {
  // const db = getLibData();
  // const cartIds = getCartItems();

  // // Lọc lấy thông tin chi tiết các cuốn sách có ID nằm trong giỏ hàng
  // const cartBooks = db.sach.filter(s => cartIds.includes(s.id));
  syncCartWithDatabase(); // Chạy đồng bộ trước khi vẽ giao diện

  const db = getLibData();
  const cartIds = getCartItems();
  const cartBooks = db.sach.filter((s) => cartIds.includes(s.id));
  let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 border border-white shadow-xl animate-in slide-in-from-right-10 duration-700 min-h-[70vh] flex flex-col">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Giỏ Sách <span class="text-blue-500">Đã Chọn</span></h3>
                    <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Bạn có ${
                      cartBooks.length
                    } cuốn sách chờ xác nhận</p>
                </div>
                ${
                  cartBooks.length > 0
                    ? `
                    <button onclick="clearFullCart()" class="text-rose-500 font-black text-[10px] uppercase tracking-widest hover:underline">Xóa tất cả</button>
                `
                    : ""
                }
            </div>

            <div class="flex-1">
                ${
                  cartBooks.length === 0
                    ? `
                    <div class="h-full flex flex-col items-center justify-center py-20 space-y-6">
                        <div class="text-8xl opacity-20">🛒</div>
                        <p class="text-slate-400 font-bold uppercase tracking-widest text-sm">Giỏ hàng của bạn đang trống</p>
                        <button onclick="loadUserModule('catalog')" class="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl">
                            Quay lại kho sách
                        </button>
                    </div>
                `
                    : `
                    <div class="space-y-4">
                        ${cartBooks
                          .map(
                            (s) => `
                            <div class="flex items-center justify-between p-6 bg-white border border-slate-50 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
                                <div class="flex items-center gap-6">
                                    <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">📘</div>
                                    <div>
                                        <h5 class="font-black text-slate-800">${s.tieuDe}</h5>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${s.tacGia}</p>
                                    </div>
                                </div>
                                <button onclick="removeFromCart(${s.id})" class="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors text-xl">
                                    ✕
                                </button>
                            </div>
                        `
                          )
                          .join("")}
                    </div>

                    <div class="mt-12 p-10 bg-slate-900 rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
                        <div class="text-white">
                            <h4 class="text-2xl font-black tracking-tight">Xác nhận mượn sách?</h4>
                            <p class="text-slate-400 text-xs font-medium mt-1">Hạn trả mặc định là 14 ngày kể từ ngày mượn.</p>
                        </div>
                        <button onclick="showQRTicket()" class="w-full md:w-auto px-12 py-5 bg-blue-500 text-white rounded-[2rem] font-black shadow-xl hover:bg-blue-400 transition-all active:scale-95 uppercase text-xs tracking-widest">
                            MƯỢN NGAY (${cartBooks.length})
                        </button>
                    </div>
                `
                }
            </div>
        </div>
    `;
  document.getElementById("mainContent").innerHTML = html;
}

// 5. Hiển thị Modal QR Ticket
function showQRTicket() {
  const db = getLibData();
  const cartIds = getCartItems();
  const userId = getCurrentUserId();
  const currentUser = db.docGia.find((u) => u.id === userId);

  if (cartIds.length === 0) return;

  const today = new Date().toISOString().split("T")[0];
  const cartBooks = db.sach.filter((s) => cartIds.includes(s.id));

  // Dữ liệu để tạo QR Code (JSON)
  const qrData = JSON.stringify({
    userId: userId,
    bookIds: cartIds,
    date: today,
  });

  // Tạo HTML cho Modal
  const modalHTML = `
        <div id="qrTicketModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div class="bg-white rounded-[3rem] p-8 w-full max-w-4xl shadow-2xl border border-white flex flex-col md:flex-row overflow-hidden">
                
                <!-- Left: Thông tin -->
                <div class="flex-1 p-6 md:border-r border-slate-100">
                    <div class="mb-8">
                        <span class="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">Phiếu Mượn Sách</span>
                        <h3 class="text-3xl font-black text-slate-900">Thông Tin <span class="text-blue-500">Đăng Ký</span></h3>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-slate-50 p-6 rounded-3xl">
                            <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Độc giả</p>
                            <p class="text-lg font-bold text-slate-800">${
                              currentUser?.hoTen
                            }</p>
                            <p class="text-xs text-slate-500 font-mono">ID: ${
                              currentUser?.id
                            }</p>
                        </div>

                        <div class="bg-slate-50 p-6 rounded-3xl">
                            <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Ngày đăng ký</p>
                            <p class="text-lg font-bold text-slate-800">${today}</p>
                        </div>

                        <div>
                            <p class="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">Sách đăng ký (${
                              cartBooks.length
                            })</p>
                            <div class="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                                ${cartBooks
                                  .map(
                                    (b) => `
                                    <div class="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl">
                                        <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-sm">📖</div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs font-bold text-slate-800 truncate">${b.tieuDe}</p>
                                            <p class="text-[9px] text-slate-400 truncate">${b.tacGia}</p>
                                        </div>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: QR Code -->
                <div class="w-full md:w-96 bg-slate-900 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    
                    <div class="bg-white p-4 rounded-3xl shadow-2xl mb-6">
                        <div id="qrcode"></div>
                    </div>
                    
                    <p class="text-white font-bold text-lg mb-2">Quét mã để xác nhận</p>
                    <p class="text-slate-400 text-xs max-w-[200px]">Vui lòng đưa mã này cho Thủ thư để hoàn tất thủ tục mượn sách.</p>

                    <button onclick="closeQRTicket()" class="mt-8 px-8 py-3 bg-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Generate QR Code
  // Note: Cần thư viện qrcode.js hoặc tương tự. Giả sử đã có hoặc dùng API.
  // Nếu chưa có thư viện, dùng API online cho nhanh gọn trong demo này.
  // Tuy nhiên, tốt nhất là dùng thư viện JS nếu có.
  // Kiểm tra index.html xem có thư viện QR chưa? Chưa thấy.
  // Dùng API goqr.me cho đơn giản và đảm bảo hoạt động ngay.

  const qrContainer = document.getElementById("qrcode");
  // Fallback: Dùng API ảnh
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    qrData
  )}`;
  qrContainer.innerHTML = `<img src="${qrUrl}" class="w-48 h-48 object-contain" alt="QR Code">`;
}

function closeQRTicket() {
  document.getElementById("qrTicketModal").remove();
}

// 6. Hàm xóa toàn bộ giỏ
function clearFullCart() {
  if (confirm("Bạn có chắc muốn xóa tất cả sách khỏi giỏ hàng?")) {
    localStorage.removeItem(`libra_cart_${userId}`);
    updateCartBadge();
    renderCart();
  }
}

// 7. Cập nhật Badge (số nhỏ trên icon giỏ hàng)
function updateCartBadge() {
  const cart = getCartItems();
  const count = cart.length;

  // 1. Cập nhật trên Dashboard (nếu đang ở trang Dashboard)
  const dashBadge = document.getElementById("cartCountDash");
  if (dashBadge) {
    dashBadge.innerText = count;
  }

  // 2. Cập nhật trên Sidebar/Menu
  const sidebarBadge = document.getElementById("cartBadge");
  if (sidebarBadge) {
    sidebarBadge.innerText = count;
    if (count > 0) {
      sidebarBadge.classList.remove("hidden");
      sidebarBadge.style.display = "flex";
    } else {
      sidebarBadge.classList.add("hidden");
      sidebarBadge.style.display = "none";
    }
  }
}

// 8. Kiểm tra và xóa sách đã mượn khỏi giỏ hàng (Dùng cho Realtime Sync)
function checkAndClearCart(db) {
  const userId = getCurrentUserId();
  const cartIds = getCartItems();

  if (cartIds.length === 0) return;

  // Lọc ra các sách trong giỏ mà user này đang mượn (hoặc đã trả)
  // Logic: Nếu sách ID X có trong bảng muonTra của user này, nghĩa là đã mượn rồi -> Xóa khỏi giỏ
  const userLoans = db.muonTra.filter((m) => m.docGiaId === userId);

  let hasChanges = false;
  let newCart = [...cartIds];

  cartIds.forEach((bookId) => {
    // Kiểm tra xem sách này có trong lịch sử mượn của user không (chỉ tính các phiếu mới tạo gần đây hoặc đang mượn)
    // Đơn giản nhất: Nếu sách đang ở trạng thái "Đang mượn" bởi user này -> Xóa
    // Note: Dùng == để so sánh lỏng (string vs number)
    const isBorrowed = userLoans.some(
      (m) => m.sachId == bookId && m.trangThai === "Đang mượn"
    );

    if (isBorrowed) {
      newCart = newCart.filter((id) => id !== bookId);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    localStorage.setItem(`libra_cart_${userId}`, JSON.stringify(newCart));
    updateCartBadge();

    // Nếu đang mở giỏ hàng thì render lại
    if (window.currentUserModule === "cart") {
      renderCart();
      // Nếu đang mở modal QR thì đóng lại vì danh sách đã thay đổi
      if (document.getElementById("qrTicketModal")) {
        closeQRTicket();
        alert("✅ Các sách bạn chọn đã được xác nhận mượn thành công!");
      }
    }
  }
}

// 8. HÀM ĐỒNG BỘ TỔNG THỂ (Quan trọng nhất)
function syncCartWithDatabase() {
  const db = getLibData();
  const userId = getCurrentUserId(); // Giả định bạn đã có hàm lấy ID user đang đăng nhập
  let cart = getCartItems();
  checkAndClearCart(db);
  if (cart.length === 0) return;

  // Lấy danh sách ID sách mà User này ĐANG MƯỢN thực tế trong DB
  const borrowedIds = db.muonTra
    .filter(
      (m) =>
        String(m.docGiaId) === String(userId) && m.trangThai === "Đang mượn"
    )
    .map((m) => String(m.sachId));

  // Chỉ giữ lại những sách TRONG GIỎ mà CHƯA CÓ trong danh sách ĐANG MƯỢN
  const filteredCart = cart.filter((id) => !borrowedIds.includes(String(id)));

  // Nếu có sự khác biệt về số lượng, nghĩa là có sách vừa được mượn thành công
  if (cart.length !== filteredCart.length) {
    localStorage.setItem(`libra_cart_${userId}`, JSON.stringify(filteredCart));
    updateCartBadge();
    return true;
  }
  return false;
}

// 9. TỰ ĐỘNG CẬP NHẬT GIAO DIỆN
// Khi người dùng chuyển tab quay lại hoặc click vào cửa sổ trình duyệt
window.addEventListener("focus", () => {
  const isUpdated = syncCartWithDatabase();
  if (isUpdated && window.currentUserModule === "cart") {
    renderCart(); // Vẽ lại giỏ hàng nếu đang ở trang giỏ hàng
  }
});
