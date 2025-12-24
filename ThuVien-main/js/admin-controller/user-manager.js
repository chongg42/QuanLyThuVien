// js/modules/user-manager.js

// Biến trạng thái toàn cục để duy trì bộ lọc khi chuyển trang
let userSearchQuery = "";
let userStatusFilter = "all";

/**
 * Hàm render chính cho Module Quản lý Độc giả
 */
async function renderUsersModule(page = 1) {

    // 1. Fetch from API
    const result = await apiAdapter.getUsers(page, 5, userSearchQuery, userStatusFilter);
    const { data: users, pagination } = result;
    const totalPages = pagination.totalPages || 1;

    let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white animate-in slide-in-from-bottom-4 duration-500">
            
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <span class="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Thành viên</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-blue-500">Độc Giả</span></h3>
                </div>

                <div class="flex flex-wrap items-center gap-4">
                    <div class="relative">
                        <input type="text" id="userSearchInput" value="${userSearchQuery}" 
                            onchange="handleUserSearch(this.value)"
                            placeholder="Tìm tên hoặc email..." 
                            class="pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all shadow-sm">
                        <span class="absolute left-4 top-4 text-slate-400">🔍</span>
                        ${userSearchQuery ? `
                            <button onclick="clearUserSearch()" class="absolute right-4 top-4 text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                        ` : ''}
                    </div>

                    <select onchange="handleUserFilter(this.value)" 
                        class="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none cursor-pointer hover:border-blue-200 transition-all shadow-sm">
                        <option value="all" ${userStatusFilter === 'all' ? 'selected' : ''}>Tất cả trạng thái</option>
                        <option value="Hoạt động" ${userStatusFilter === 'Hoạt động' ? 'selected' : ''}>Hoạt động</option>
                        <option value="Bị khóa" ${userStatusFilter === 'Bị khóa' ? 'selected' : ''}>Bị khóa</option>
                    </select>

                    <button onclick="alert('Chức năng thêm mới đang được xây dựng')" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black overflow-hidden transition-all hover:pr-12">
                        <span class="relative z-10">+ ĐĂNG KÝ THẺ</span>
                        <div class="absolute inset-y-0 right-0 w-10 bg-blue-500 flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform">→</div>
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto no-scrollbar">
                <table class="w-full text-left border-separate border-spacing-y-5">
                    <thead>
                        <tr class="text-slate-400 text-[11px] font-black tracking-[0.2em] uppercase">
                            <th class="pb-2 pl-10">Độc giả</th>
                            <th class="pb-2">Mã thẻ</th>
                            <th class="pb-2 text-center">Trạng thái</th>
                            <th class="pb-2 text-right pr-10">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.length > 0 ? users.map((u) => {
        const statusColor = u.trangThai === 'Hoạt động'
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-200"
            : "bg-rose-500/10 text-rose-600 border-rose-200";

        return `
                                <tr class="group transition-all duration-500">
                                    <td class="py-6 pl-10 rounded-l-[2.5rem] bg-white border-y border-l border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all">
                                        <div class="flex items-center gap-5">
                                            <div class="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner text-slate-400">👤</div>
                                            <div>
                                                <p class="font-black text-slate-800 text-lg">${u.hoTen || u.tenDocGia}</p>
                                                <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">${u.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all font-mono font-bold text-blue-600">
                                        ${u.maThe || '---'}
                                    </td>

                                    <td class="py-6 bg-white border-y border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-center">
                                        <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${statusColor}">
                                            ${u.trangThai || 'Hoạt động'}
                                        </span>
                                    </td>

                                    <td class="py-6 pr-10 rounded-r-[2.5rem] bg-white border-y border-r border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/20 transition-all text-right">
                                        <div class="flex justify-end gap-3">
                                            <button onclick="editUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-blue-500 hover:border-blue-200 transition-all shadow-sm">✏️</button>
                                            <button onclick="deleteUser(${u.id})" class="w-10 h-10 flex items-center justify-center bg-white text-slate-400 rounded-xl border border-slate-100 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm">🚫</button>
                                        </div>
                                    </td>
                                </tr>`;
    }).join("") : `
                            <tr>
                                <td colspan="4" class="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100">
                                    <p class="text-slate-300 font-bold uppercase tracking-widest text-sm italic">Không tìm thấy độc giả nào khớp với bộ lọc</p>
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center items-center gap-3 mt-12">
                ${renderUserPagination(page, totalPages)}
            </div>
        </div>
    `;
    document.getElementById("mainContent").innerHTML = html;
}

/**
 * Các hàm hỗ trợ lọc và tìm kiếm
 */
async function handleUserSearch(value) {
    userSearchQuery = value;
    await renderUsersModule(1);
}

async function clearUserSearch() {
    userSearchQuery = "";
    document.getElementById('userSearchInput').value = "";
    await renderUsersModule(1);
}

async function handleUserFilter(value) {
    userStatusFilter = value;
    await renderUsersModule(1);
}

function renderUserPagination(currentPage, totalPages) {
    if (totalPages <= 1) return '';
    let pHTML = '';

    // Prev
    if (currentPage > 1) {
        pHTML += `<button onclick="renderUsersModule(${currentPage - 1})" class="w-12 h-12 rounded-2xl font-black bg-white text-slate-400 hover:bg-slate-50 border border-slate-50 transition-all">←</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-50';
        pHTML += `<button onclick="renderUsersModule(${i})" class="w-12 h-12 rounded-2xl font-black transition-all ${activeClass}">${i}</button>`;
    }

    // Next
    if (currentPage < totalPages) {
        pHTML += `<button onclick="renderUsersModule(${currentPage + 1})" class="w-12 h-12 rounded-2xl font-black bg-white text-slate-400 hover:bg-slate-50 border border-slate-50 transition-all">→</button>`;
    }

    return pHTML;
}

/**
 * Chức năng Xóa Độc giả
 */
async function deleteUser(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa độc giả này?`)) {
        try {
            await apiAdapter.deleteUser(id);
            await renderUsersModule(1);
            logActivity("Quản lý", `Đã xóa độc giả ID: ${id}`, "warning");
        } catch (e) {
            alert('Lỗi khi xóa độc giả: ' + e.message);
        }
    }
}

/**
 * Chức năng Sửa Độc giả (Mở Modal)
 */
async function editUser(id) {
    try {
        const user = await apiAdapter.getUser(id);
        if (!user) {
            alert('Không tìm thấy thông tin độc giả!');
            return;
        }

        const modalHTML = `
            <div id="userModal" class="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div class="bg-white rounded-[3rem] p-12 w-full max-w-lg shadow-2xl border border-white animate-in zoom-in-95 duration-300">
                    <div class="flex justify-between items-center mb-8">
                        <h3 class="text-3xl font-black text-slate-900">Sửa <span class="text-blue-500">Độc Giả</span></h3>
                        <button onclick="closeUserModal()" class="text-slate-300 hover:text-rose-500 text-2xl transition-colors">✕</button>
                    </div>
                    
                    <div class="space-y-6">
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Họ và Tên</label>
                            <input type="text" id="editUserName" value="${user.hoTen}" 
                                class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
                            <input type="email" id="editUserEmail" value="${user.email || ''}" 
                                class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Trạng thái tài khoản</label>
                            <select id="editUserStatus" class="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 font-bold transition-all cursor-pointer">
                                <option value="Hoạt động" ${user.trangThai === 'Hoạt động' ? 'selected' : ''}>🟢 Hoạt động</option>
                                <option value="Bị khóa" ${user.trangThai === 'Bị khóa' ? 'selected' : ''}>🔴 Bị khóa</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex gap-4 mt-12">
                        <button onclick="closeUserModal()" class="flex-1 px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase text-xs">Hủy</button>
                        <button onclick="updateUser(${id})" class="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase text-xs">Lưu Thay Đổi</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    } catch (e) {
        alert('Lỗi tải thông tin độc giả: ' + e.message);
    }
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.remove();
}

/**
 * Lưu thay đổi Độc giả
 */
async function updateUser(id) {
    const userData = {
        hoTen: document.getElementById('editUserName').value,
        email: document.getElementById('editUserEmail').value,
        trangThai: document.getElementById('editUserStatus').value,
        soDienThoai: '', // Keep existing or fetch if needed, currently API adapter handles generic update. Backend won't clear if undefined unless logic says so. 
        // Backend update: UPDATE doc_gia SET ho_ten = ?, email = ?, so_dien_thoai = ?, dia_chi = ?, trang_thai = ?
        // If I pass undefined/empty, I might overwrite data. 
        // I should probably fetch the user again or store the original data to preserve fields like phone/address if I don't show them in the modal.
        // The modal only edits Name, Email, Status.
        // I need to preserve Phone and Address.
    };

    // To be safe, I should fetch the current user data again, or better yet, editUser should store the full user object in a global or closure.
    // Or I just re-fetch in updateUser which is safer but slower.
    try {
        const currentUser = await apiAdapter.getUser(id);
        userData.soDienThoai = currentUser.soDienThoai;
        userData.diaChi = currentUser.diaChi;

        await apiAdapter.updateUser(id, userData);
        closeUserModal();
        await renderUsersModule(1); // Refresh current page? Currently passing 1 manually or should use global variable if tracked. 
        // renderUsersModule uses `userSearchQuery` and `userStatusFilter` globals, so page 1 is safe or I can track `currentUserPage`.
        // The previous implementation used global `renderUsersModule` without arguments re-rendering page 1.
        // Let's stick to reloading p1 or tracked page.

        logActivity("Quản lý", `Đã cập nhật thông tin cho độc giả ${userData.hoTen}`, "info");
    } catch (e) {
        alert('Lỗi cập nhật độc giả: ' + e.message);
    }
}