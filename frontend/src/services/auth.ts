import api from './api';

export interface User {
    id: string;
    full_name: string;
    email: string;
    role: string;
    organization?: string;
    bio?: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
}

const authService = {
    login: async (payload: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', payload);
        const { access_token, user } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    },

    register: async (payload: any): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', payload);
        const { access_token, user } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    getCurrentUser: (): User | null => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('access_token');
    }
};

export default authService;
