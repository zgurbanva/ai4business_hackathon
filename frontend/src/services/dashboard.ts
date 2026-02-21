import api from './api';

export interface SectorDistributionItem {
    sector: string;
    count: number;
}

export interface KpiDashboard {
    total_startups: number;
    total_programs: number;
    applications_submitted: number;
    investor_interest_count: number;
    average_startup_score: number | null;
    sector_distribution: SectorDistributionItem[];
    trust_distribution: Record<string, number>;
    updated_at: string;
}

const dashboardService = {
    getKpis: async (): Promise<KpiDashboard> => {
        const response = await api.get<KpiDashboard>('/dashboard/kpis');
        return response.data;
    }
};

export default dashboardService;
