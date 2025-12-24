// js/user-controller/loan-tickets.js
// 1. Render Lịch sử mượn trả (Tất cả)
function renderLoanHistory() {
    const db = getLibData();
    const userId = getCurrentUserId();
    // Sắp xếp mới nhất lên đầu
    const myHistory = db.muonTra.filter(m => m.docGiaId === userId).sort((a, b) => b.id - a.id);

    let html = `
        <div class="bg-white/70 backdrop-blur-xl rounded-[4rem] p-10 border border-white shadow-xl animate-in fade-in duration-700">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-separate border-spacing-y-4">
                    <thead>
                        <tr class="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <th class="pl-8 pb-4">Tên sách</th>
                            <th class="pb-4 text-center">Ngày mượn</th>
                            <th class="pb-4 text-center">Hạn trả</th>
                            <th class="pb-4 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${myHistory.length > 0 ? myHistory.map(m => {
        const book = db.sach.find(s => s.id === m.sachId);
        const statusStyle = m.trangThai === 'Đã trả'
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
            : 'bg-blue-50 text-blue-600 border-blue-100';

        return `
                            <tr class="group hover:scale-[1.01] transition-transform duration-300" onclick="showLoanDetail(${m.id})" style="cursor: pointer;">
                                <td class="py-6 pl-8 bg-white border-y border-l border-slate-50 rounded-l-3xl font-bold text-slate-800 shadow-sm">${book?.tieuDe}</td>
                                <td class="py-6 bg-white border-y border-slate-50 text-center font-medium text-slate-500 shadow-sm">${m.ngayMuon}</td>
                                <td class="py-6 bg-white border-y border-slate-50 text-center font-medium text-slate-500 shadow-sm">${m.hanTra}</td>
                                <td class="py-6 pr-8 bg-white border-y border-r border-slate-50 rounded-r-3xl text-center shadow-sm">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase border ${statusStyle}">${m.trangThai}</span>
                                </td>
                            </tr>`;
    }).join('') : `
                            <tr>
                                <td colspan="4" class="text-center py-20 text-slate-400 font-bold uppercase tracking-widest">Bạn chưa có lịch sử mượn sách nào</td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// 2. Render Phiếu mượn đang kích hoạt (Chỉ "Đang mượn")
// function renderLoanTickets() {
//     const db = getLibData();
//     const userId = getCurrentUserId();
//     const activeLoans = db.muonTra.filter(m => m.docGiaId === userId && m.trangThai === "Đang mượn");

//     let html = `
//         <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-700">
//             ${activeLoans.length > 0 ? activeLoans.map(m => {
//         const book = db.sach.find(s => s.id === m.sachId);
//         const isOverdue = new Date(m.hanTra) < new Date();

//         return `
//                 <div class="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden">
//                     <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[3rem] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                    
//                     <div class="relative z-10">
//                         <div class="flex justify-between items-start mb-6">
//                             <span class="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Phiếu #${m.id}</span>
//                             <button onclick="showSingleQRCode(${m.id})" class="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform text-xl" title="Xem mã QR">
//                                 🏁
//                             </button>
//                         </div>

//                         <h3 class="text-2xl font-black text-slate-800 mb-2 line-clamp-2">${book?.tieuDe}</h3>
//                         <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">${book?.tacGia}</p>

//                         <div class="space-y-3 pt-6 border-t border-slate-50">
//                             <div class="flex justify-between text-xs">
//                                 <span class="text-slate-400 font-bold">Ngày mượn</span>
//                                 <span class="font-black text-slate-700">${m.ngayMuon}</span>
//                             </div>
//                             <div class="flex justify-between text-xs">
//                                 <span class="text-slate-400 font-bold">Hạn trả</span>
//                                 <span class="font-black ${isOverdue ? 'text-rose-500' : 'text-emerald-500'}">${m.hanTra}</span>
//                             </div>
//                         </div>

//                         ${isOverdue ? `
//                             <div class="mt-6 p-3 bg-rose-50 rounded-xl text-center border border-rose-100">
//                                 <p class="text-[10px] font-black text-rose-500 uppercase tracking-widest">⚠️ Đã quá hạn trả sách</p>
//                             </div>
//                         ` : ''}
//                     </div>
//                 </div>
//                 `;
//     }).join('') : `
//                 <div class="col-span-2 py-20 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
//                     <div class="text-6xl opacity-20 mb-4">🎫</div>
//                     <p class="text-slate-400 font-bold uppercase tracking-widest text-sm">Bạn không có phiếu mượn nào đang hoạt động</p>
//                     <button onclick="loadUserModule('catalog')" class="mt-6 px-8 py-3 bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-200">
//                         Mượn sách ngay
//                     </button>
//                 </div>
//             `}
//         </div>
//     `;
//     document.getElementById('mainContent').innerHTML = html;
// }

// // 3. Hiển thị QR Code cho 1 phiếu mượn cụ thể
// function showSingleQRCode(loanId) {
//     const db = getLibData();
//     const loan = db.muonTra.find(m => m.id === loanId);
//     if (!loan) return;

//     const book = db.sach.find(s => s.id === loan.sachId);
//     const userId = getCurrentUserId();
//     const user = db.docGia.find(u => u.id === userId);

//     // Format dữ liệu QR: Có thể dùng format batch hoặc format đơn lẻ
//     // Ở đây dùng format đơn giản để Admin dễ xử lý
//     // Format: "USER:ID" hoặc "BOOK:ID" hoặc JSON
//     // Để tiện lợi, ta tạo JSON chứa thông tin trả sách
//     const qrData = JSON.stringify({
//         type: "RETURN",
//         loanId: loan.id,
//         bookId: loan.sachId,
//         userId: userId
//     });

//     const modalHTML = `
//         <div id="qrSingleModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
//             <div class="bg-white rounded-[3rem] p-8 w-full max-w-md shadow-2xl border border-white text-center relative overflow-hidden">
//                 <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                
//                 <h3 class="text-2xl font-black text-slate-900 mb-1">Mã Phiếu Mượn</h3>
//                 <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">#${loan.id}</p>

//                 <div class="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 inline-block mb-6">
//                     <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}" class="w-48 h-48 object-contain" alt="QR Code">
//                 </div>

//                 <div class="text-left bg-slate-50 p-6 rounded-2xl mb-6 space-y-2">
//                     <p class="text-xs font-bold text-slate-700 truncate">📘 ${book?.tieuDe}</p>
//                     <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hạn trả: ${loan.hanTra}</p>
//                 </div>

//                 <button onclick="document.getElementById('qrSingleModal').remove()" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">
//                     Đóng
//                 </button>
//             </div>
//         </div>
//     `;
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
// }
