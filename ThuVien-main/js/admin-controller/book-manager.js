// js/admin-controller/book-manager.js

let currentBookPage = 1;
let currentSearchTerm = '';
let currentCategoryFilter = 'all';

async function renderBooksModule(page = 1) {
    currentBookPage = page;

    // 1. Fetch data in parallel
    const [booksResult, categories] = await Promise.all([
        apiAdapter.getBooks(page, 5, currentSearchTerm, currentCategoryFilter),
        apiAdapter.getCategories()
    ]);

    const { data: books, pagination } = booksResult;
    const totalPages = pagination.totalPages || 1;

    // Note: Category stats calculation is removed as it requires fetching all books which is not efficient with server-side pagination.
    // We will display categories without counts for now.

    let html = `
        <div class="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
            
            <div class="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                <div>
                    <span class="text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-2 block">Thư viện 4.0</span>
                    <h3 class="text-4xl font-black text-slate-900 tracking-tighter">Quản Lý <span class="text-orange-500">Kho Sách</span></h3>
                </div>
                <button onclick="showAddBookModal()" class="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black overflow-hidden transition-all hover:pr-12">
                    <span class="relative z-10">+ THÊM SÁCH MỚI</span>
                    <div class="absolute inset-y-0 right-0 w-10 bg-orange-500 flex items-center justify-center translate-x-10 group-hover:translate-x-0 transition-transform">→</div>
                </button>
            </div>

            <!-- Search and Filter Section -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                <!-- Search Box -->
                <div class="lg:col-span-2">
                    <div class="relative">
                        <input 
                            type="text" 
                            id="searchInput"
                            placeholder=" Tìm kiếm theo tên sách hoặc tác giả..." 
                            value="${currentSearchTerm}"
                            onchange="changeInput(this.value)"
                            class="w-full px-6 py-4 pl-12 rounded-2xl bg-white border-2 border-slate-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-400"
                        >
                        <button class="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" onclick="handleSearchBooks()">🔍</button>
                        ${currentSearchTerm ? `
                            <button 
                                onclick="clearSearch()" 
                                class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                            >✕</button>
                        ` : ''}
                    </div>
                </div>

                <!-- Category Filter -->
                <div>
                    <select 
                        id="categoryFilter"
                        onchange="handleCategoryFilter(this.value)"
                        class="w-full px-6 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700"
                    >
                        <option value="all" ${currentCategoryFilter === 'all' ? 'selected' : ''}>📚 Tất cả thể loại</option>
                        ${categories.map(cat => `
                            <option value="${cat.id}" ${currentCategoryFilter == cat.id ? 'selected' : ''}>
                                ${cat.ten}
                            </option>
                        `).join('')}
                    </select>
                </div>
            </div>

            <!-- Category Stats Pills -->
            <div class="flex flex-wrap gap-3 mb-8">
                <button 
                    onclick="handleCategoryFilter('all')"
                    class="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${currentCategoryFilter === 'all'
            ? 'bg-slate-900 text-white shadow-lg shadow-slate-300'
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
        }"
                >
                    Tất cả
                </button>
                ${categories.map(cat => {
            const isActive = currentCategoryFilter == cat.id;
            const colors = cat.id % 4 === 1 ? 'blue' : cat.id % 4 === 2 ? 'purple' : cat.id % 4 === 3 ? 'green' : 'pink';
            return `
                        <button 
                            onclick="handleCategoryFilter('${cat.id}')"
                            class="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${isActive
                    ? `bg-${colors}-500 text-white shadow-lg shadow-${colors}-200`
                    : `bg-${colors}-50 text-${colors}-600 border border-${colors}-200 hover:bg-${colors}-100`
                }"
                        >
                            ${cat.ten}
                        </button>
                    `;
        }).join('')}
            </div>

            <!-- Results Info -->
            ${(currentSearchTerm || currentCategoryFilter !== 'all') ? `
                <div class="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl">
                    <p class="text-sm font-bold text-slate-700">
                        Tìm thấy <span class="text-orange-600 text-lg">${pagination.total}</span> kết quả
                        ${currentSearchTerm ? ` cho "<span class="text-orange-600">${currentSearchTerm}</span>"` : ''}
                        ${currentCategoryFilter !== 'all' ? ` trong thể loại <span class="text-orange-600">${categories.find(t => t.id == currentCategoryFilter)?.ten}</span>` : ''}
                    </p>
                </div>
            ` : ''}

            ${books.length === 0 ? `
                <div class="text-center py-16">
                    <div class="text-6xl mb-4">📭</div>
                    <h4 class="text-2xl font-black text-slate-400 mb-2">Không tìm thấy kết quả</h4>
                    <p class="text-slate-400 font-bold">Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
                    ${currentSearchTerm || currentCategoryFilter !== 'all' ? `
                        <button onclick="resetFilters()" class="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">
                            Đặt lại bộ lọc
                        </button>
                    ` : ''}
                </div>
            ` : `
                <div class="overflow-x-auto no-scrollbar">
                    <table class="w-full text-left border-separate border-spacing-y-5">
                        <thead>
                            <tr class="text-slate-400 text-[11px] font-black tracking-[0.2em] uppercase">
                                <th class="pb-2 pl-10">Tác phẩm</th>
                                <th class="pb-2">Phân loại</th>
                                <th class="pb-2 text-center">Số lượng</th>
                                <th class="pb-2 text-right pr-10">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${books.map((s) => {
            const badgeColors =
                s.theLoaiId % 4 === 1
                    ? "bg-blue-500/10 text-blue-600 border-blue-200"
                    : s.theLoaiId % 4 === 2
                        ? "bg-purple-500/10 text-purple-600 border-purple-200"
                        : s.theLoaiId % 4 === 3
                            ? "bg-green-500/10 text-green-600 border-green-200"
                            : "bg-pink-500/10 text-pink-600 border-pink-200";

            const theLoaiName = s.theLoaiTen || "Khác";

            // Highlight search term
            let displayTitle = s.tieuDe;
            let displayAuthor = s.tacGia;
            if (currentSearchTerm) {
                const regex = new RegExp(`(${currentSearchTerm})`, 'gi');
                displayTitle = s.tieuDe.replace(regex, '<mark class="bg-yellow-200 font-black">$1</mark>');
                displayAuthor = s.tacGia.replace(regex, '<mark class="bg-yellow-200 font-black">$1</mark>');
            }

            return `
                                    <tr class="group transition-all duration-500">
                                        <td class="py-6 pl-10 rounded-l-[2.5rem] bg-white border-y border-l border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all">
                                            <div class="flex items-center gap-5">
                                                <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-200 group-hover:rotate-6 transition-transform">📖</div>
                                                <div>
                                                    <p class="font-black text-slate-800 text-lg group-hover:text-orange-600 transition-colors">${displayTitle}</p>
                                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">${displayAuthor}</p>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td class="py-6 bg-white border-y border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all">
                                            <span class="px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${badgeColors}">
                                                ${theLoaiName}
                                            </span>
                                        </td>

                                        <td class="py-6 bg-white border-y border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all text-center">
                                            <div class="inline-block">
                                                <span class="text-2xl font-black text-slate-800">${s.soLuong}</span>
                                                <div class="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                    <div class="h-full bg-orange-500" style="width: ${s.soLuong > 50 ? 100 : s.soLuong * 2}%"></div>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="py-6 pr-10 rounded-r-[2.5rem] bg-white border-y border-r border-slate-100 group-hover:border-orange-200 group-hover:bg-orange-50/20 transition-all text-right">
                                            <div class="flex justify-end gap-3">
                                                <button onclick="editBook(${s.id})" class="w-12 h-12 flex items-center justify-center bg-white text-blue-500 rounded-2xl border border-slate-100 shadow-sm hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                                   ✏️
                                                </button>
                                                <button onclick="deleteBook(${s.id})" class="w-12 h-12 flex items-center justify-center bg-white text-red-500 rounded-2xl border border-slate-100 shadow-sm hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-300">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `;
        })
            .join("")}
                        </tbody>
                    </table>
                </div>

                <div class="flex justify-center items-center gap-3 mt-12">
                    ${renderPagination(page, totalPages)}
                </div>
            `}
        </div>
        ${await renderBookModalHTML(categories)}
    `;

    return html;
}

// Search handler
async function handleSearchBooks() {
    currentBookPage = 1; // Reset to first page
    document.getElementById('mainContent').innerHTML = await renderBooksModule(1);
}

function changeInput(term) {
    currentSearchTerm = term.trim();
}

// Category filter handler
async function handleCategoryFilter(categoryId) {
    currentCategoryFilter = categoryId;
    currentBookPage = 1; // Reset to first page
    document.getElementById('mainContent').innerHTML = await renderBooksModule(1);
}

// Clear search
async function clearSearch() {
    currentSearchTerm = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('mainContent').innerHTML = await renderBooksModule(currentBookPage);
}

// Reset all filters
async function resetFilters() {
    currentSearchTerm = '';
    currentCategoryFilter = 'all';
    currentBookPage = 1;
    document.getElementById('mainContent').innerHTML = await renderBooksModule(1);
}

function renderPagination(currentPage, totalPages) {
    if (totalPages <= 1) return '';

    let html = '';

    // Previous Button
    if (currentPage > 1) {
        html += `<button onclick="renderBooksModule(${currentPage - 1}).then(h => document.getElementById('mainContent').innerHTML = h)" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">←</button>`;
    }

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<button class="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold shadow-lg shadow-slate-300 transition-all">${i}</button>`;
        } else {
            html += `<button onclick="renderBooksModule(${i}).then(h => document.getElementById('mainContent').innerHTML = h)" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">${i}</button>`;
        }
    }

    // Next Button
    if (currentPage < totalPages) {
        html += `<button onclick="renderBooksModule(${currentPage + 1}).then(h => document.getElementById('mainContent').innerHTML = h)" class="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition-all">→</button>`;
    }

    return html;
}

async function renderBookModalHTML(categories = []) {
    // If categories not passed, fetch them (though usually passed from renderBooksModule)
    if (categories.length === 0) {
        categories = await apiAdapter.getCategories();
    }

    return `
    <div id="bookModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onclick="closeBookModal()"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl transform transition-all scale-100">
            <h3 id="modalTitle" class="text-2xl font-black text-slate-800 mb-6">Thêm Sách Mới</h3>
            <form id="bookForm" onsubmit="saveBook(event)">
                <input type="hidden" id="bookId">
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tên sách</label>
                        <input type="text" id="bookTitle" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tác giả</label>
                            <input type="text" id="bookAuthor" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Năm XB</label>
                            <input type="number" id="bookYear" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Thể loại</label>
                            <select id="bookCategory" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                                ${categories.map(cat => `<option value="${cat.id}">${cat.ten}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Số lượng</label>
                            <input type="number" id="bookQuantity" required class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-slate-700">
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 mt-8">
                    <button type="button" onclick="closeBookModal()" class="flex-1 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Hủy bỏ</button>
                    <button type="submit" class="flex-1 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all">Lưu thông tin</button>
                </div>
            </form>
        </div>
    </div>
    `;
}

function showAddBookModal() {
    document.getElementById('modalTitle').innerText = 'Thêm Sách Mới';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.getElementById('bookModal').classList.remove('hidden');
}

function closeBookModal() {
    document.getElementById('bookModal').classList.add('hidden');
}

async function editBook(id) {
    try {
        const book = await apiAdapter.getBook(id);
        if (book) {
            document.getElementById('modalTitle').innerText = 'Cập Nhật Sách';
            document.getElementById('bookId').value = book.id;
            document.getElementById('bookTitle').value = book.tieuDe;
            document.getElementById('bookAuthor').value = book.tacGia;
            document.getElementById('bookYear').value = book.namXuatBan;
            document.getElementById('bookCategory').value = book.theLoaiId;
            document.getElementById('bookQuantity').value = book.soLuong;
            document.getElementById('bookModal').classList.remove('hidden');
        }
    } catch (e) {
        alert('Lỗi khi tải thông tin sách: ' + e.message);
    }
}

async function saveBook(event) {
    event.preventDefault();
    const id = document.getElementById('bookId').value;
    const bookData = {
        tieuDe: document.getElementById('bookTitle').value,
        tacGia: document.getElementById('bookAuthor').value,
        namXuatBan: parseInt(document.getElementById('bookYear').value),
        theLoaiId: parseInt(document.getElementById('bookCategory').value),
        soLuong: parseInt(document.getElementById('bookQuantity').value),
        nhaXuatBan: 'NXB Giáo Dục', // Default value for compatibility
        moTa: '' // Optional description
    };

    try {
        if (id) {
            await apiAdapter.updateBook(id, bookData);
            logActivity("Cập nhật sách", `Cập nhật sách ID: ${id}`, "info");
        } else {
            await apiAdapter.createBook(bookData);
            logActivity("Thêm sách", `Thêm sách mới: ${bookData.tieuDe}`, "success");
        }
        closeBookModal();
        document.getElementById('mainContent').innerHTML = await renderBooksModule(currentBookPage);
    } catch (e) {
        alert('Lỗi khi lưu sách: ' + e.message);
    }
}

async function deleteBook(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sách này không?')) {
        try {
            await apiAdapter.deleteBook(id);
            logActivity("Xóa sách", `Quản trị viên đã xóa đầu sách có mã ID: ${id}`, "danger");
            document.getElementById('mainContent').innerHTML = await renderBooksModule(currentBookPage);
        } catch (e) {
            alert('Lỗi xóa sách: ' + e.message);
        }
    }
}