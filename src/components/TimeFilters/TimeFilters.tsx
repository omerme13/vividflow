import { useTaskContext } from "@/context/TaskContext";
import { DashboardTimeFilter } from "@/types/dashboard";
import { getClassWithModifier } from "@/utils/styles";

import './TimeFilters.scss';

export default function TimeFilters() {
    const { timeFilter, setTimeFilter } = useTaskContext();

    return (
        <div className="time-filters">
            {Object.values(DashboardTimeFilter).map((filter) => (
                <button
                    key={filter}
                    className={getClassWithModifier("time-filters__filter", "active", timeFilter === filter)}
                    onClick={() => setTimeFilter(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
