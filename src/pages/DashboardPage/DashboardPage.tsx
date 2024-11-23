import Dashboard from "@/components/Dashboard";

import "./DashboardPage.scss";
import TimeFilters from "@/components/TimeFilters/TimeFilters";

export default function DashboardPage() {
    return <div className="dashboard-page">
		<TimeFilters />
		<Dashboard />
	</div>;
}
