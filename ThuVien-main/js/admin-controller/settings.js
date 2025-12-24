// js/admin-controller/settings.js

function renderSettingsModule() {
    const db = getLibData();

    // 1. Xác định người dùng hiện tại (Admin hoặc Độc giả)
    let currentUser = null;
    let userType = 'guest'; // 'admin' or 'user'

    const adminSession = localStorage.getItem('session');
    const userSession = localStorage.getItem('libra_login');

    if (userSession) {
        currentUser = JSON.parse(userSession);
        userType = 'user';
    } else if (adminSession) {
        currentUser = JSON.parse(adminSession);
        userType = 'admin';
    } else {
        // Fallback cho dev/test
        currentUser = db.admin[0];
        userType = 'admin';
    }

    // Cập nhật lại thông tin mới nhất từ DB (để tránh stale data trong session)
    if (userType === 'user') {
        const freshUser = db.docGia.find(u => u.id === currentUser.id);
        if (freshUser) currentUser = freshUser;
    } else {
        const freshAdmin = db.admin.find(a => a.id === currentUser.id);
        if (freshAdmin) currentUser = freshAdmin;
    }

    // 2. Chuẩn bị dữ liệu hiển thị
    const displayName = userType === 'user' ? currentUser.hoTen : currentUser.taiKhoan;
    const displayRole = userType === 'user' ? 'Độc giả' : currentUser.vaiTro;

    // Field 1: Tên hiển thị (Admin: Tài khoản, User: Họ tên)
    const field1Label = userType === 'user' ? 'Họ và tên' : 'Tên tài khoản';
    const field1Value = userType === 'user' ? currentUser.hoTen : currentUser.taiKhoan;

    // Field 2: Thông tin phụ (Admin: Vai trò, User: Email)
    const field2Label = userType === 'user' ? 'Email' : 'Vai trò';
    const field2Value = userType === 'user' ? currentUser.email : currentUser.vaiTro;

    let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 shadow-xl border border-white/50 animate-in fade-in zoom-in duration-700">
            <div class="mb-12">
                <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Cài Đặt <span class="text-orange-500">Tài Khoản</span></h3>
                <p class="text-slate-400 font-medium mt-2 text-sm">Quản lý thông tin cá nhân và bảo mật hệ thống</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                        <h4 class="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                            <span class="w-2 h-6 bg-blue-500 rounded-full"></span> Thông tin cá nhân
                        </h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">${field1Label}</label>
                                <input type="text" value="${field1Value}" disabled
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-500 cursor-not-allowed">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">${field2Label}</label>
                                <input type="text" value="${field2Value}" disabled
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-500 cursor-not-allowed">
                            </div>
                        </div>
                        
                        <div class="mt-6">
                            <p class="text-[10px] text-slate-400 italic text-right">* Thông tin cá nhân không thể tự chỉnh sửa. Vui lòng liên hệ Admin.</p>
                        </div>
                    
                    </div>

                    <div class="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                        <h4 class="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                            <span class="w-2 h-6 bg-rose-500 rounded-full"></span> Bảo mật & Mật khẩu
                        </h4>
                        
                        <div class="space-y-6 max-w-md">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu hiện tại</label>
                                <input type="password" id="old-pass" placeholder="••••••••"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mật khẩu mới</label>
                                <input type="password" id="new-pass" placeholder="Nhập mật khẩu mới"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirm-pass" placeholder="Nhập lại mật khẩu mới"
                                    class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:border-rose-500 outline-none transition-all">
                            </div>
                        </div>
                        
                        <button onclick="changePassword(${currentUser.id}, '${userType}')" class="mt-8 px-10 py-4 bg-rose-500 text-white rounded-2xl font-black hover:bg-rose-600 transition-all shadow-lg shadow-rose-100">
                            ĐỔI MẬT KHẨU
                        </button>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="bg-gradient-to-br from-orange-400 to-yellow-500 p-1 rounded-[3rem]">
                        <div class="bg-white p-10 rounded-[2.8rem] text-center">
                            <div class="w-32 h-32 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-inner border-4 border-white">
                                ${userType === 'user' ? '👤' : '👨‍💻'}
                            </div>
                            <h5 class="text-xl font-black text-slate-800">${displayName}</h5>
                            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">${displayRole}</p>
                            
                            <div class="mt-8 pt-8 border-t border-slate-50 flex justify-around">
                                <div>
                                    <p class="text-xs font-black text-slate-800">Trạng thái</p>
                                    <p class="text-[10px] text-emerald-500 font-bold uppercase">Online</p>
                                </div>
                                <div>
                                    <p class="text-xs font-black text-slate-800">Thành viên</p>
                                    <p class="text-[10px] text-slate-400 font-bold uppercase">${userType === 'user' ? 'Standard' : 'Admin'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Hàm đổi mật khẩu
function changePassword(userId, userType) {
    const db = getLibData();
    const oldPass = document.getElementById('old-pass').value;
    const newPass = document.getElementById('new-pass').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    let user;
    if (userType === 'user') {
        user = db.docGia.find(u => u.id === userId);
    } else {
        user = db.admin.find(a => a.id === userId);
    }

    if (!user) return alert("Không tìm thấy thông tin người dùng!");

    if (oldPass !== user.matKhau) {
        return alert("Mật khẩu hiện tại không chính xác!");
    }
    if (newPass.length < 3) { // Giảm yêu cầu độ dài cho dễ test
        return alert("Mật khẩu mới phải có ít nhất 3 ký tự!");
    }
    if (newPass !== confirmPass) {
        return alert("Xác nhận mật khẩu mới không trùng khớp!");
    }

    // Cập nhật
    user.matKhau = newPass;
    updateLibData(db);

    // Ghi nhật ký
    logActivity("Bảo mật", `${userType === 'user' ? 'Độc giả' : 'Admin'} ${userType === 'user' ? user.hoTen : user.taiKhoan} đã đổi mật khẩu`, "warning");

    alert("Đổi mật khẩu thành công!");

    // Xóa input
    document.getElementById('old-pass').value = '';
    document.getElementById('new-pass').value = '';
    document.getElementById('confirm-pass').value = '';
}