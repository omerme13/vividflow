import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { CalendarViewMode } from "@/types/calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCalendar } from "@/context/CalendarContext";
import { DEFAULT_CALENDAR_PREFERENCES } from "@/utils/constants";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.scss";

export default function CalendarPage() {
	const { events, currentView, setCurrentView, selectedDate, setSelectedDate } = useCalendar();
	
    const locales = {
        "en-US": enUS,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    return (
        <div className="calendar-page">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
				view={currentView}
				onView={(view: View) => setCurrentView(view)}
				views={Object.values(CalendarViewMode)}
				date={selectedDate}
				onNavigate={(date: Date) => setSelectedDate(date)}
				defaultView={DEFAULT_CALENDAR_PREFERENCES.currentView}
            />
        </div>
    );
}
