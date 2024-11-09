import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.scss";
import { useCalendar } from "@/context/CalendarContext";

export default function CalendarPage() {
	const { events } = useCalendar();
	
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
            />
        </div>
    );
}
