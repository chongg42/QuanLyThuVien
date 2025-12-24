async function loadModule(moduleName, element) {
  window.currentModule = moduleName; // Lưu module hiện tại để reload khi cần
  document
    .querySelectorAll(".nav-item")
    .forEach((item) => item.classList.remove("active"));
  if (element) element.classList.add("active");

  const content = document.getElementById("mainContent");
  const title = document.getElementById("moduleTitle");
  const db = getLibData(); // Keep for legacy modules

  // Show loading state
  content.innerHTML = `<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>`;

  switch (moduleName) {
    case "dashboard":
      title.innerText = "Tổng Quan Hệ Thống";
      if (typeof renderDashboard === "function")
        renderDashboard(db);
      break;
    case "books":
      title.innerText = "Quản Lý Kho Sách";
      if (typeof renderBooksModule === "function") {
        content.innerHTML = await renderBooksModule(1);
      }
      break;
    case "users":
      title.innerText = "Danh Sách Độc Giả";
      if (typeof renderUsersModule === "function") {
        await renderUsersModule(1);
      }
      break;
    case "overdue":
      title.innerText = "Cảnh Báo Quá Hạn";
      if (typeof renderOverdueModule === "function") {
        renderOverdueModule();
      }
      break;
    case "logs":
      title.innerText = "Lịch Sử Hoạt Động";
      renderActivityLog();
      break;
    case 'settings':
      title.innerText = "Cấu Hình Tài Khoản";
      renderSettingsModule();
      break;
    case 'backup':
      title.innerText = "Quản Lý Dữ Liệu";
      renderBackupRestoreModule();
      break;
    case 'muontra':
      title.innerText = "Quản Lý Giao Dịch";
      renderLoanModule();
      break;
    default:
      content.innerHTML = `<div class="p-20 bg-white/50 backdrop-blur-md rounded-[3rem] text-center border border-white">
                <div class="text-6xl mb-6">🛠️</div>
                <h3 class="text-2xl font-black text-slate-800">Chức năng ${moduleName}</h3>
                <p class="text-slate-400 mt-2 italic font-medium">Đang trong quá trình hoàn thiện giao diện.</p>
            </div>`;
      break;
  }
}
