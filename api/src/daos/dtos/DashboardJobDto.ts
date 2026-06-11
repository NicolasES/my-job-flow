export interface DashboardJobDto {
    id: number;
    title: string;
    company: string;
    location: string;
    date: string;
}

export interface DashboardColumnDto {
    id: number;
    name: string;
    order: number;
    jobs: DashboardJobDto[];
}
