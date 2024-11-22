export interface DashboardItemProps {
    title: string;
    children: React.ReactNode;
    filters?: React.ReactNode;
    fullRow?: boolean;
	hasContainer?: boolean;
	className?: string;
}
