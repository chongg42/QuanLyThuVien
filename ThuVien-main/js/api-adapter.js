const API_BASE_URL = 'http://localhost:3000/api';

const apiAdapter = {
    // Helper function for fetching
    fetch: async (endpoint, options = {}) => {
        try {
            const token = localStorage.getItem('auth_token');
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });
            if (!response.ok) {
                if (response.status === 404) return null;
                // Auto logout on 401
                if (response.status === 401 && !endpoint.includes('/auth/')) {
                    localStorage.removeItem('auth_token');
                    window.location.href = 'index.html';
                }
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.message || `API Error: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },

    // --- AUTH ---
    loginAdmin: async (username, password) => {
        const result = await apiAdapter.fetch('/auth/admin/login', {
            method: 'POST',
            body: JSON.stringify({ tai_khoan: username, mat_khau: password })
        });
        if (result && result.success) {
            localStorage.setItem('auth_token', result.data.token);
            localStorage.setItem('user_info', JSON.stringify(result.data.admin));
            localStorage.setItem('user_role', 'admin');
        }
        return result;
    },

    loginUser: async (email, password) => {
        const result = await apiAdapter.fetch('/auth/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, mat_khau: password })
        });
        if (result && result.success) {
            localStorage.setItem('auth_token', result.data.token);
            localStorage.setItem('user_info', JSON.stringify(result.data.user));
            localStorage.setItem('user_role', 'user');
        }
        return result;
    },

    registerUser: async (userData) => {
        const payload = {
            ho_ten: userData.hoTen,
            email: userData.email,
            mat_khau: userData.matKhau,
            so_dien_thoai: userData.soDienThoai || '',
            dia_chi: userData.diaChi || ''
        };
        return await apiAdapter.fetch('/auth/user/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_role');
        window.location.href = 'index.html';
    },

    getCurrentUser: () => {
        const info = localStorage.getItem('user_info');
        return info ? JSON.parse(info) : null;
    },

    // --- BOOKS ---
    getBooks: async (page = 1, limit = 10, search = '', categoryId = '') => {
        const queryParams = new URLSearchParams({ page, limit });
        if (search) queryParams.append('search', search);
        if (categoryId && categoryId !== 'all') queryParams.append('theLoaiId', categoryId);

        const result = await apiAdapter.fetch(`/sach?${queryParams.toString()}`);
        if (!result || !result.success) return { data: [], pagination: {} };

        // Map snake_case to camelCase
        const data = result.data.map(book => ({
            id: book.id,
            tieuDe: book.tieu_de,
            tacGia: book.tac_gia,
            theLoaiId: book.the_loai_id,
            nhaXuatBan: book.nha_xuat_ban,
            namXuatBan: book.nam_xuat_ban,
            soLuong: book.so_luong,
            moTa: book.mo_ta,
            theLoaiTen: book.the_loai_ten
        }));

        return { data, pagination: result.pagination };
    },

    getBook: async (id) => {
        const result = await apiAdapter.fetch(`/sach/${id}`);
        if (!result || !result.success) return null;
        const book = result.data;
        return {
            id: book.id,
            tieuDe: book.tieu_de,
            tacGia: book.tac_gia,
            theLoaiId: book.the_loai_id,
            nhaXuatBan: book.nha_xuat_ban,
            namXuatBan: book.nam_xuat_ban,
            soLuong: book.so_luong,
            moTa: book.mo_ta
        };
    },

    createBook: async (bookData) => {
        // Map camelCase to snake_case
        const payload = {
            tieu_de: bookData.tieuDe,
            tac_gia: bookData.tacGia,
            the_loai_id: bookData.theLoaiId,
            nha_xuat_ban: bookData.nhaXuatBan,
            nam_xuat_ban: bookData.namXuatBan,
            so_luong: bookData.soLuong,
            mo_ta: bookData.moTa
        };
        return await apiAdapter.fetch('/sach', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    updateBook: async (id, bookData) => {
        const payload = {
            tieu_de: bookData.tieuDe,
            tac_gia: bookData.tacGia,
            the_loai_id: bookData.theLoaiId,
            nha_xuat_ban: bookData.nhaXuatBan,
            nam_xuat_ban: bookData.namXuatBan,
            so_luong: bookData.soLuong,
            mo_ta: bookData.moTa
        };
        return await apiAdapter.fetch(`/sach/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    },

    deleteBook: async (id) => {
        return await apiAdapter.fetch(`/sach/${id}`, {
            method: 'DELETE'
        });
    },

    // --- CATEGORIES ---
    getCategories: async () => {
        const result = await apiAdapter.fetch('/the-loai');
        if (!result || !result.success) return [];
        return result.data;
    },

    // --- USERS ---
    getUsers: async (page = 1, limit = 10, search = '', status = '') => {
        const queryParams = new URLSearchParams({ page, limit });
        if (search) queryParams.append('search', search);
        if (status && status !== 'all') queryParams.append('trangThai', status);

        const result = await apiAdapter.fetch(`/doc-gia?${queryParams.toString()}`);
        if (!result || !result.success) return { data: [], pagination: {} };

        // Map snake_case to camelCase
        const data = result.data.map(user => ({
            id: user.id,
            hoTen: user.ho_ten,
            tenDocGia: user.ho_ten, // For compatibility
            email: user.email,
            soDienThoai: user.so_dien_thoai,
            diaChi: user.dia_chi,
            trangThai: user.trang_thai,
            maThe: `TV-${user.id.toString().padStart(4, '0')}` // Generate a fake card ID if not in DB
        }));

        return { data, pagination: result.pagination };
    },

    getUser: async (id) => {
        const result = await apiAdapter.fetch(`/doc-gia/${id}`);
        if (!result || !result.success) return null;
        const user = result.data;
        return {
            id: user.id,
            hoTen: user.ho_ten,
            email: user.email,
            soDienThoai: user.so_dien_thoai,
            diaChi: user.dia_chi,
            trangThai: user.trang_thai
        };
    },

    createUser: async (userData) => {
        const payload = {
            ho_ten: userData.hoTen,
            email: userData.email,
            so_dien_thoai: userData.soDienThoai,
            dia_chi: userData.diaChi || '',
            mat_khau: userData.matKhau || '123456' // Default password
        };
        return await apiAdapter.fetch('/doc-gia', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    updateUser: async (id, userData) => {
        const payload = {
            ho_ten: userData.hoTen,
            email: userData.email,
            so_dien_thoai: userData.soDienThoai,
            dia_chi: userData.diaChi,
            trang_thai: userData.trangThai
        };
        return await apiAdapter.fetch(`/doc-gia/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload)
        });
    },

    deleteUser: async (id) => {
        return await apiAdapter.fetch(`/doc-gia/${id}`, {
            method: 'DELETE'
        });
    }
};

window.apiAdapter = apiAdapter;
