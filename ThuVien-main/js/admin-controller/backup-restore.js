// js/modules/backup-restore.js

function renderBackupRestoreModule() {
    let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-12 shadow-xl border border-white/50 animate-in fade-in duration-700 h-[85vh] flex flex-col">
            <div class="mb-12">
                <span class="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    Data Management
                </span>
                <h3 class="text-5xl font-black text-slate-900 tracking-tighter">Sao Lưu & <span class="text-emerald-500">Khôi Phục</span></h3>
                <p class="text-slate-400 font-medium mt-2">Bảo vệ dữ liệu thư viện của bạn bằng cách xuất/nhập file JSON</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
                <div class="group p-10 rounded-[3.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-emerald-100 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div class="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">📥</div>
                        <h4 class="text-2xl font-black text-slate-800 mb-4">Sao lưu dữ liệu</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-8">
                            Tải toàn bộ dữ liệu hiện tại (Sách, Độc giả, Nhật ký...) về máy tính dưới dạng file <span class="font-bold text-slate-600">.json</span>. Hãy thực hiện việc này định kỳ để tránh mất mát dữ liệu.
                        </p>
                    </div>
                    <button onclick="executeBackup()" class="w-full py-5 bg-emerald-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all">
                        Tải về file dự phòng
                    </button>
                </div>

                <div class="group p-10 rounded-[3.5rem] bg-white border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 flex flex-col justify-between">
                    <div>
                        <div class="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform">📤</div>
                        <h4 class="text-2xl font-black text-slate-800 mb-4">Khôi phục dữ liệu</h4>
                        <p class="text-slate-400 text-sm leading-relaxed mb-8">
                            Chọn một file sao lưu đã có từ máy tính để ghi đè vào hệ thống hiện tại. <span class="text-rose-500 font-bold italic">Cảnh báo: Hành động này không thể hoàn tác.</span>
                        </p>
                    </div>
                    <div>
                        <label for="restore-upload" class="w-full py-5 bg-blue-500 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all flex items-center justify-center cursor-pointer">
                            Chọn file khôi phục
                        </label>
                        <input type="file" id="restore-upload" class="hidden" accept=".json" onchange="executeRestore(event)">
                    </div>
                </div>
            </div>

            <div class="mt-10 p-6 bg-slate-50 rounded-[2rem] flex items-center gap-4 border border-slate-100">
                <span class="text-2xl">💡</span>
                <p class="text-xs text-slate-500 font-medium">Mẹo: Bạn nên sao lưu dữ liệu trước khi thực hiện các thay đổi lớn hoặc sau mỗi ca làm việc để đảm bảo an toàn tuyệt đối cho kho sách.</p>
            </div>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Logic thực thi Sao lưu
function executeBackup() {
    const db = getLibData();
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const now = new Date();
    
    a.href = url;
    a.download = `Libratech_Backup_${now.getDate()}_${now.getMonth()+1}.json`;
    a.click();
    
    logActivity("Hệ thống", "Thực hiện sao lưu dữ liệu thành công", "success");
    URL.revokeObjectURL(url);
}

// Logic thực thi Khôi phục
function executeRestore(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // Kiểm tra cấu trúc dữ liệu tối thiểu
            if (!data.sach || !data.docGia) throw new Error("File không đúng cấu trúc!");

            if (confirm("Hành động này sẽ XÓA TOÀN BỘ dữ liệu hiện tại. Bạn chắc chắn chứ?")) {
                saveLibData(data);
                logActivity("Hệ thống", "Đã khôi phục dữ liệu từ file JSON bên ngoài", "danger");
                alert("Khôi phục thành công! Hệ thống sẽ khởi động lại.");
                location.reload();
            }
        } catch (err) {
            alert("Lỗi: File JSON không hợp lệ!");
        }
    };
    reader.readAsText(file);
}