// js/user-controller/user-router.js

function loadUserModule(moduleName, element) {
  window.currentUserModule = moduleName; // Lưu module hiện tại để reload khi cần
  // 1. Reset UI Sidebar
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active", "text-white");
    item.classList.add("text-slate-500");
  });
  if (element) {
    element.classList.add("active", "text-white");
    element.classList.remove("text-slate-500");
  }

  const title = document.getElementById("moduleTitle");
  const db = getLibData();

  // 2. Điều hướng Module
  switch (moduleName) {
    case "dashboard":
      title.innerText = "Bảng điều khiển";
      renderUserDashboard();
      break;
    case "catalog":
      title.innerText = "Khám phá kho sách";
      renderCatalog();
      break;
    case "cart":
      title.innerText = "Giỏ hàng mượn sách";
      renderCart();
      break;
    case "history":
      title.innerText = "Lịch sử mượn trả";
      renderLoanHistory(); // Renamed from renderUserHistory
      break;
    // case "tickets":
    //   title.innerText = "Phiếu mượn đang kích hoạt";
    //   renderLoanTickets();
    //   break;
    case "settings":
      title.innerText = "Cài đặt tài khoản";
      renderSettingsModule(); // Gọi module settings dùng chung
      break;
  }
}

// Hàm lấy ID người dùng hiện tại từ LocalStorage
function getCurrentUserId() {
  const user = JSON.parse(localStorage.getItem('libra_login'));
  return user ? user.id : 1; // Fallback to 1 if not logged in (for testing)
}
