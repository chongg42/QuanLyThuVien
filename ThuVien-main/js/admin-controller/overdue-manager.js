// js/modules/overdue-manager.js

function renderOverdueModule() {
    const db = getLibData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Lọc danh sách thực tế từ dữ liệu
    const overdueList = db.muonTra.filter(m => {
        const dueDate = new Date(m.hanTra);
        return m.trangThai === "Đang mượn" && dueDate < today;
    }).map(m => {
        const user = db.docGia.find(u => u.id === m.docGiaId);
        const book = db.sach.find(s => s.id === m.sachId);
        const diffDays = Math.ceil(Math.abs(today - new Date(m.hanTra)) / (1000 * 60 * 60 * 24));
        return { ...m, user, book, diffDays };
    });

    let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-xl border border-white animate-in fade-in duration-500">
            <div class="flex justify-between items-center mb-10">
                <div>
                    <h3 class="text-3xl font-black text-slate-800 tracking-tighter">Cảnh Báo <span class="text-rose-500">Quá Hạn</span></h3>
                    <p class="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">Dữ liệu thời gian thực</p>
                </div>
                ${overdueList.length > 0 ? `
                    <button onclick="sendBulkGmail()" class="bg-rose-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-rose-200 hover:scale-105 transition-all flex items-center gap-3">
                        <span class="text-xl">📧</span> GỬI NHẮC NHỞ TẤT CẢ (${overdueList.length})
                    </button>
                ` : ''}
            </div>

            <div class="overflow-hidden rounded-[2.5rem] border border-rose-100">
                <table class="w-full text-left">
                    <thead class="bg-rose-50/50">
                        <tr class="text-rose-400 uppercase text-[10px] font-black tracking-widest">
                            <th class="p-6">Độc giả</th>
                            <th class="p-6">Sách mượn</th>
                            <th class="p-6 text-center">Ngày trễ</th>
                            <th class="p-6 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-rose-50 bg-white">
                        ${overdueList.length === 0 ? 
                            `<tr><td colspan="4" class="p-20 text-center text-slate-400 font-bold">✅ Hiện tại không có sách quá hạn.</td></tr>` : 
                            overdueList.map(item => `
                            <tr class="hover:bg-rose-50/30 transition-all">
                                <td class="p-6">
                                    <div class="font-bold text-slate-700">${item.user?.hoTen || 'N/A'}</div>
                                    <div class="text-[10px] text-slate-400">${item.user?.email || 'Không có email'}</div>
                                </td>
                                <td class="p-6">
                                    <div class="font-bold text-slate-800">${item.book?.tieuDe || 'N/A'}</div>
                                    <div class="text-[10px] text-rose-400">Hạn: ${item.hanTra}</div>
                                </td>
                                <td class="p-6 text-center">
                                    <span class="px-3 py-1 bg-rose-500 text-white rounded-lg text-[10px] font-black italic">Trễ ${item.diffDays} ngày</span>
                                </td>
                                <td class="p-6 text-right">
                                    <button onclick="sendSingleGmail('${item.user?.email}', '${item.user?.hoTen}', '${item.book?.tieuDe}')" 
                                        class="p-3 bg-slate-900 text-white rounded-xl hover:bg-orange-500 transition-all shadow-md">
                                        ✉️ Gửi nhắc nhở
                                    </button>
                                </td>
                            </tr>`).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Nội dung mẫu Email dùng chung
const EMAIL_TEMPLATE = {
    subject: '[LibraTech] Thông báo quá hạn trả sách',
    getBody: (name, book) => `Kính gửi Quý độc giả ${name},

Thư viện LibraTech xin thông báo: Cuốn sách "${book}" bạn mượn đã QUÁ HẠN trả.

Vui lòng sắp xếp trả sách sớm để tránh phát sinh phí phạt (10,000 VNĐ/ngày).

Trân trọng,
Ban Quản Lý Thư Viện LibraTech`
};

// Hàm gửi cho tất cả (Dùng BCC như bạn muốn)
function sendBulkGmail() {
    const db = getLibData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueList = db.muonTra.filter(m => {
        const dueDate = new Date(m.hanTra);
        return m.trangThai === "Đang mượn" && dueDate < today;
    });

    if (confirm(`Gửi email nhắc nhở đến ${overdueList.length} người dùng?\n\nHệ thống sẽ mở Gmail với danh sách ẩn danh (BCC).`)) {
        const emails = overdueList.map(m => {
            const user = db.docGia.find(u => u.id === m.docGiaId);
            return user?.email;
        }).filter(e => e).join(',');

        const subject = encodeURIComponent(EMAIL_TEMPLATE.subject);
        const body = encodeURIComponent(EMAIL_TEMPLATE.getBody('Quý độc giả', 'các sách đang mượn'));
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${emails}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
    }
    logActivity("Gửi Email", `Đã mở Gmail để gửi thông báo BCC cho các độc giả quá hạn`, "warning");
}

// Hàm gửi lẻ cho 1 người
function sendSingleGmail(email, name, book) {
    if (!email || email === 'undefined') return alert("Độc giả này chưa cập nhật Email!");
    
    const subject = encodeURIComponent(EMAIL_TEMPLATE.subject);
    const body = encodeURIComponent(EMAIL_TEMPLATE.getBody(name, book));
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
}
