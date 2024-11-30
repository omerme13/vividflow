import { TimeFilter } from "@/types/dashboard";
import { getClassWithModifier } from "@/utils/styles";
import { useDashboardContext } from "@/context/DashboardContext";

import './TimeFilters.scss';

export default function TimeFilters() {
    const { timeFilter, updateTimeFilter } = useDashboardContext();

    return (
        <div className="time-filters">
            {Object.values(TimeFilter).map((filter) => (
                <button
                    key={filter}
                    className={getClassWithModifier("time-filters__filter", "active", timeFilter === filter)}
                    onClick={() => updateTimeFilter(filter)}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
