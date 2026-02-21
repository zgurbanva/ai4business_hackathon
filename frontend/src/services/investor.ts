import api from './api';

export interface InvestorInterest {
    id: string;
    investor_user_id: string;
    startup_id: string;
    note?: string;
    created_at: string;
}

export interface InvestorInterestListResponse {
    items: InvestorInterest[];
}

const investorService = {
    getInterests: async (): Promise<InvestorInterestListResponse> => {
        const response = await api.get<InvestorInterestListResponse>('/investor/interests');
        return response.data;
    },

    markInterest: async (startupId: string, note?: string): Promise<InvestorInterest> => {
        const response = await api.post<InvestorInterest>(`/startups/${startupId}/interest`, { note });
        return response.data;
    },

    removeInterest: async (startupId: string): Promise<void> => {
        await api.delete(`/startups/${startupId}/interest`);
    }
};

export default investorService;
