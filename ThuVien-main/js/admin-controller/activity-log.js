// js/modules/activity-log.js

function renderActivityLog() {
    const db = getLibData();
    const logs = db.nhatKy || [];

    let html = `
        <div class="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-10 shadow-xl border border-white/50 h-[85vh] flex flex-col animate-in fade-in duration-700">
            
            <div class="shrink-0 mb-8">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <span class="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                             System Monitoring
                        </span>
                        <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Nhật Ký <span class="text-orange-500">Hệ Thống</span></h3>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <input type="text" id="logSearch" onkeyup="filterLogs()" placeholder="Tìm hoạt động..." 
                                class="pl-10 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-orange-500 outline-none w-64 transition-all">
                            <span class="absolute left-4 top-3.5 text-slate-400">🔍</span>
                        </div>
                        
                        <button onclick="clearActivityLog()" class="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                            🗑️
                        </button>
                    </div>
                </div>

                <div class="flex gap-2 mt-8 p-1.5 bg-slate-100/50 w-fit rounded-2xl">
                    <button onclick="filterByType('all')" class="log-tab active px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Tất cả</button>
                    <button onclick="filterByType('success')" class="log-tab px-6 py-2 rounded-xl text-[10px] font-black uppercase text-emerald-600 transition-all">Thành công</button>
                    <button onclick="filterByType('warning')" class="log-tab px-6 py-2 rounded-xl text-[10px] font-black uppercase text-orange-600 transition-all">Cảnh báo</button>
                    <button onclick="filterByType('danger')" class="log-tab px-6 py-2 rounded-xl text-[10px] font-black uppercase text-rose-600 transition-all">Nguy hiểm</button>
                </div>
            </div>

            <div id="logContainer" class="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-6 relative">
                <div class="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-100 -z-10"></div>
                
                ${logs.map((log, index) => {
                    const configs = {
                        success: { icon: "check", bg: "bg-emerald-500", text: "text-emerald-600", border: "border-emerald-100" },
                        warning: { icon: "mail", bg: "bg-orange-500", text: "text-orange-600", border: "border-orange-100" },
                        danger: { icon: "trash", bg: "bg-rose-500", text: "text-rose-600", border: "border-rose-100" },
                        info: { icon: "info", bg: "bg-blue-500", text: "text-blue-600", border: "border-blue-100" }
                    };
                    const config = configs[log.loai] || configs.info;

                    return `
                    <div class="log-item flex items-start gap-6 group transition-all" data-type="${log.loai}" data-content="${log.hanhDong.toLowerCase()} ${log.chiTiet.toLowerCase()}">
                        <div class="w-10 h-10 rounded-full ${config.bg} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <span class="text-xs">●</span>
                        </div>
                        <div class="flex-1 bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm group-hover:shadow-md group-hover:border-orange-100 transition-all">
                            <div class="flex justify-between items-center mb-2">
                                <span class="px-3 py-1 rounded-lg text-[9px] font-black uppercase ${config.text} ${config.border} bg-slate-50">
                                    ${log.hanhDong}
                                </span>
                                <span class="font-mono text-[10px] text-slate-300 font-bold">${log.thoiGian}</span>
                            </div>
                            <p class="text-slate-600 text-sm font-medium">${log.chiTiet}</p>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>

        <style>
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
            .log-tab.active { background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        </style>
    `;
    document.getElementById('mainContent').innerHTML = html;
}

// Hàm lọc theo ô nhập liệu
function filterLogs() {
    const query = document.getElementById('logSearch').value.toLowerCase();
    const items = document.querySelectorAll('.log-item');
    
    items.forEach(item => {
        const content = item.getAttribute('data-content');
        item.style.display = content.includes(query) ? 'flex' : 'none';
    });
}

// Hàm lọc theo nút (Type)
function filterByType(type) {
    const items = document.querySelectorAll('.log-item');
    const tabs = document.querySelectorAll('.log-tab');
    
    // Cập nhật giao diện tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    items.forEach(item => {
        if (type === 'all' || item.getAttribute('data-type') === type) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}