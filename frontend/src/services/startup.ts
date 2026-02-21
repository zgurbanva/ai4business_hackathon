import api from './api';

export interface Startup {
    id: string;
    startup_id_code: string;
    name: string;
    tagline?: string;
    description: string;
    sector: string;
    stage: string;
    website_url?: string;
    city?: string;
    team_size?: number;
    latest_success_score?: number;
    // Additional fields for UI compatibility
    location?: string;
    type?: string;
    employees?: number;
    status?: string;
    funding?: string;
    risk?: string;
    riskColor?: string;
    lead?: string;
}

const startupService = {
    getStartups: async (params?: any): Promise<{ items: Startup[], meta: any }> => {
        const response = await api.get('/startups', { params });
        return response.data;
    },

    register: async (payload: any): Promise<Startup> => {
        const response = await api.post('/startups', payload);
        return response.data;
    },

    getProfile: async (id: string): Promise<Startup> => {
        const response = await api.get(`/startups/${id}`);
        return response.data;
    }
};

export default startupService;
