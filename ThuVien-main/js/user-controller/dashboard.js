// js/user-controller/dashboard.js

function renderUserDashboard() {
    const db = getLibData(); // Lấy dữ liệu từ data.js
    const userId = getCurrentUserId(); // Hàm lấy ID user hiện tại
    const cartItems = getCartItems(); // Lấy từ logic giỏ hàng

    // 1. Tìm thông tin Độc giả
    const currentUser = db.docGia.find(u => u.id === userId);

    // Cập nhật tên hiển thị trên Sidebar nếu có
    const sidebarName = document.getElementById('user-display-name');
    if (sidebarName && currentUser) {
        sidebarName.innerText = currentUser.hoTen;
    }

    // 2. Phân tích dữ liệu mượn trả
    const allMyLoans = db.muonTra.filter(m => m.docGiaId === userId);
    const activeLoans = allMyLoans.filter(m => m.trangThai === "Đang mượn");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueLoans = activeLoans.filter(m => new Date(m.hanTra) < today);

    let html = `
        <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-10 pb-10">
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div class="p-10 rounded-[4rem] bg-white border border-white shadow-xl shadow-slate-200/50 group hover:bg-blue-50 transition-all duration-500">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-6xl font-black text-slate-800 tracking-tighter">${activeLoans.length}</h4>
                        <span class="text-3xl grayscale group-hover:grayscale-0 transition-all">📖</span>
                    </div>
                    <p class="text-blue-500 font-black text-[10px] uppercase tracking-[0.2em]">Sách đang cầm</p>
                </div>

               <div onclick="loadUserModule('cart')" class="p-10 rounded-[4rem] bg-orange-500 text-white shadow-xl shadow-orange-200 cursor-pointer hover:scale-105 transition-all group">
                    <div class="flex justify-between items-start mb-4">
                        <h4 id="cartCountDash" class="text-6xl font-black tracking-tighter">${cartItems.length}</h4>
                        <span class="text-3xl group-hover:rotate-12 transition-transform">🛒</span>
                    </div>
                    <p class="text-orange-100 font-black text-[10px] uppercase tracking-[0.2em]">Sách trong giỏ hàng</p>
                </div>

                <div class="p-10 rounded-[4rem] bg-white border border-white shadow-xl shadow-slate-200/50 group hover:bg-rose-50 transition-all duration-500">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-6xl font-black ${overdueLoans.length > 0 ? 'text-rose-500' : 'text-slate-800'} tracking-tighter">
                            ${overdueLoans.length}
                        </h4>
                        <span class="text-3xl ${overdueLoans.length > 0 ? 'animate-bounce' : 'grayscale'}">⏰</span>
                    </div>
                    <p class="text-rose-400 font-black text-[10px] uppercase tracking-[0.2em]">Sách đã quá hạn</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div class="lg:col-span-1 p-12 rounded-[4rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden h-full">
                    <div class="absolute -bottom-10 -right-10 text-[15rem] opacity-5 pointer-events-none">👤</div>
                    <div class="relative z-10 space-y-8">
                        <div>
                            <span class="px-4 py-1.5 bg-orange-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest">Tài khoản độc giả</span>
                            <h2 class="text-4xl font-black mt-4 leading-none tracking-tighter">${currentUser?.tenDocGia || 'Độc giả'}</h2>
                            <p class="text-slate-500 font-bold text-xs mt-2 italic">${currentUser?.email || 'Chưa cập nhật email'}</p>
                        </div>
                        
                        <div class="space-y-4 pt-6 border-t border-white/10">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-500 font-bold">Mã số thẻ:</span>
                                <span class="font-black text-orange-400 font-mono">${currentUser?.maThe || 'N/A'}</span>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-500 font-bold">Trạng thái:</span>
                                <span class="text-emerald-400 font-black">${currentUser?.trangThai || 'Hoạt động'}</span>
                            </div>
                        </div>

                        <button onclick="loadUserModule('settings')" class="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <div class="lg:col-span-2 bg-white/70 backdrop-blur-xl p-12 rounded-[4rem] border border-white shadow-xl">
                    <div class="flex justify-between items-center mb-10">
                        <h3 class="text-2xl font-black text-slate-800 tracking-tighter">Đang mượn gần đây</h3>
                        <button onclick="loadUserModule('history')" class="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Xem tất cả lịch sử</button>
                    </div>
                    
                    <div class="space-y-4">
                        ${activeLoans.length === 0 ?
            `<div class="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                                <p class="text-slate-300 font-bold uppercase tracking-widest text-xs">Bạn hiện chưa mượn sách nào</p>
                            </div>` :
            activeLoans.slice(0, 3).map(m => {
                const book = db.sach.find(s => s.id === m.sachId);
                const isLate = new Date(m.hanTra) < today;
                return `
                                    <div class="flex items-center justify-between p-6 bg-white border border-slate-50 rounded-[2.5rem] hover:shadow-lg transition-all duration-300">
                                        <div class="flex items-center gap-5">
                                            <div class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl">📚</div>
                                            <div>
                                                <h5 class="font-black text-slate-800">${book?.tieuDe}</h5>
                                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tác giả: ${book?.tacGia}</p>
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-[9px] font-black uppercase text-slate-300 mb-1">Hạn trả</p>
                                            <span class="px-4 py-1.5 rounded-xl font-mono text-xs font-black ${isLate ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-slate-50 text-slate-700'}">
                                                ${m.hanTra}
                                            </span>
                                        </div>
                                    </div>
                                `;
            }).join('')
        }
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;

    // Cập nhật lại số lượng badge ở các vị trí khác
    if (typeof updateCartBadge === 'function') updateCartBadge();
}