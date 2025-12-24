// js/modules/dashboard.js

function renderDashboard(db) {
    // 1. DỮ LIỆU THỜI GIAN THỰC
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalBooks = db.sach.length;
    const totalUsers = db.docGia.length;

    // Tính số sách đang mượn và đã trả
    const totalLoans = db.muonTra.length;
    const booksOnLoan = db.muonTra.filter(m => m.trangThai === "Đang mượn").length;
    const booksReturned = totalLoans - booksOnLoan;

    // Tính số sách quá hạn
    const overdueCount = db.muonTra.filter(m => m.trangThai === "Đang mượn" && new Date(m.hanTra) < today).length;

    // Dữ liệu cho biểu đồ thể loại
    const categoryCounts = {};
    db.sach.forEach(s => {
        const catName = db.theLoai.find(t => t.id === s.theLoaiId)?.ten || "Khác";
        categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
    });
    const categoryLabels = Object.keys(categoryCounts);
    const categoryData = Object.values(categoryCounts);

    // 2. CẤU TRÚC GIAO DIỆN MỚI (Bento Grid Style)
    let html = `
        <div class="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            
            <!-- Top Stats Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Stat Card 1 -->
                <div class="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300">
                    <div class="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-xl">📚</div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Kho sách</span>
                        </div>
                        <h4 class="text-4xl font-black text-slate-800 tracking-tight">${totalBooks}</h4>
                        <div class="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-500">
                            <span>↑ 12%</span> <span class="text-slate-400 font-medium">tháng này</span>
                        </div>
                    </div>
                </div>

                <!-- Stat Card 2 -->
                <div class="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300">
                    <div class="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">👥</div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Độc giả</span>
                        </div>
                        <h4 class="text-4xl font-black text-slate-800 tracking-tight">${totalUsers}</h4>
                        <div class="mt-2 flex items-center gap-1 text-xs font-bold text-blue-500">
                            <span>+${db.docGia.length}</span> <span class="text-slate-400 font-medium">mới</span>
                        </div>
                    </div>
                </div>

                <!-- Stat Card 3 -->
                <div class="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300">
                    <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">⚡</div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang mượn</span>
                        </div>
                        <h4 class="text-4xl font-black text-slate-800 tracking-tight">${booksOnLoan}</h4>
                        <div class="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div class="bg-purple-500 h-full rounded-full" style="width: ${(booksOnLoan / totalLoans) * 100}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Stat Card 4 -->
                <div class="relative overflow-hidden bg-white p-6 rounded-[2.5rem] shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300">
                    <div class="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center text-xl">⚠️</div>
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Quá hạn</span>
                        </div>
                        <h4 class="text-4xl font-black text-rose-500 tracking-tight">${overdueCount}</h4>
                        <p class="text-[10px] text-rose-400 font-bold mt-2">Cần xử lý ngay</p>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Main Chart Area -->
                <div class="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
                    <div class="flex justify-between items-center mb-8">
                        <h4 class="text-xl font-black text-slate-800">Phân Bố Kho Sách</h4>
                        <button class="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition">Theo thể loại</button>
                    </div>
                    <div class="h-[300px] w-full">
                        <canvas id="categoryChart"></canvas>
                    </div>
                </div>

                <!-- Loan Status Chart (Small) -->
                <div class="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
                    <h4 class="text-lg font-black text-slate-800 mb-6 w-full text-left">Tỷ lệ Mượn/Trả</h4>
                    <div class="h-[200px] w-full relative">
                        <canvas id="loanChart"></canvas>
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div class="text-center">
                                <span class="block text-2xl font-black text-slate-800">${totalLoans}</span>
                                <span class="text-[10px] text-slate-400 font-bold uppercase">Lượt</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-4 w-full justify-center">
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span class="text-xs font-bold text-slate-500">Đang mượn</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-3 h-3 rounded-full bg-emerald-400"></span>
                            <span class="text-xs font-bold text-slate-500">Đã trả</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 3. GÁN HTML VÀ KHỞI TẠO BIỂU ĐỒ
    document.getElementById("mainContent").innerHTML = html;

    // Init Charts
    initDashboardCharts(booksOnLoan, booksReturned, categoryLabels, categoryData);
}

function initDashboardCharts(onLoan, returned, catLabels, catData) {
    // 1. Loan Chart (Doughnut)
    const ctxLoan = document.getElementById('loanChart').getContext('2d');

    // Destroy existing chart if it exists
    if (window.myLoanChart) {
        window.myLoanChart.destroy();
    }

    window.myLoanChart = new Chart(ctxLoan, {
        type: 'doughnut',
        data: {
            labels: ['Đang mượn', 'Đã trả'],
            datasets: [{
                data: [onLoan, returned],
                backgroundColor: ['#3b82f6', '#34d399'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => ` ${context.label}: ${context.raw}`
                    }
                }
            }
        }
    });

    // 2. Category Chart (Bar)
    const ctxCat = document.getElementById('categoryChart').getContext('2d');

    // Destroy existing chart if it exists
    if (window.myCategoryChart) {
        window.myCategoryChart.destroy();
    }

    window.myCategoryChart = new Chart(ctxCat, {
        type: 'bar',
        data: {
            labels: catLabels,
            datasets: [{
                label: 'Số lượng sách',
                data: catData,
                backgroundColor: '#f97316',
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { family: "'Plus Jakarta Sans', sans-serif" } }
                }
            }
        }
    });
}

// --- EXPORT REPORT FUNCTION ---
function exportSystemReport() {
    const db = getLibData();
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    // 1. Prepare Data Rows (Không dùng tiền tố "data:text/csv..." ở đây nữa)
    let csvContent = "";

    // Header Section
    csvContent += `BÁO CÁO HỆ THỐNG THƯ VIỆN - LIBMODERN\n`;
    csvContent += `Ngày xuất: ${now.toLocaleString()}\n\n`;

    // Summary Section
    csvContent += `TỔNG QUAN\n`;
    csvContent += `Tổng số sách,${db.sach.length}\n`;
    csvContent += `Tổng độc giả,${db.docGia.length}\n`;
    csvContent += `Lượt mượn trả,${db.muonTra.length}\n`;
    csvContent += `Sách quá hạn,${db.muonTra.filter(m => m.trangThai === "Đang mượn" && new Date(m.hanTra) < new Date()).length}\n\n`;

    let dangMuon =db.muonTra.filter(m => m.trangThai === "Đang mượn").map(m => m.sachId);
    csvContent += `Các sách đang được mượn:\n`; 
    csvContent += `${db.sach.filter(s => dangMuon.includes(s.id)).map(m => m.tieuDe).join("\n")}\n\n`;

    csvContent += `DANH SÁCH SÁCH MỚI NHẬP\n`;
    csvContent += `ID,Tiêu Đề,Tác Giả,Năm XB,Số Lượng\n`;
    db.sach.slice(0, 10).forEach(s => {
        csvContent += `${s.id},"${s.tieuDe}","${s.tacGia}",${s.namXuatBan},${s.soLuong}\n`;
    });
    csvContent += `\n`;

    // Recent Logs Section
    csvContent += `NHẬT KÝ HOẠT ĐỘNG GẦN ĐÂY\n`;
    csvContent += `Thời Gian,Người Dùng,Hành Động,Chi Tiết\n`;
    if (db.nhatKy) {
        db.nhatKy.forEach(log => {
            csvContent += `${log.thoiGian},"${log.nguoiDung}","${log.hanhDong}","${log.chiTiet}"\n`;
        });
    }

    // 2. Sử dụng Blob với BOM để hỗ trợ Tiếng Việt (UTF-8)
    // \uFEFF là "Byte Order Mark" giúp Excel nhận diện đúng font Tiếng Việt
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BaoCao_HeThong_${dateStr}.csv`);
    document.body.appendChild(link);
    
    link.click();
    
    // Dọn dẹp
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}