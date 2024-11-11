import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { CalendarEvent, CalendarViewMode } from "@/types/calendar";
import { format, parse, startOfWeek, getDay, setHours } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCalendar } from "@/context/CalendarContext";
import { DEFAULT_CALENDAR_PREFERENCES } from "@/utils/constants";
import Tooltip from "@/components/Tooltip";
import useTaskModal from "@/hooks/useTaskModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.scss";

export default function CalendarPage() {
    const { events, currentView, setCurrentView, selectedDate, setSelectedDate, workingHours } = useCalendar();
    const { taskModal, handleEdit } = useTaskModal();

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

    const handleSelectEvent = (e: CalendarEvent) => {
        handleEdit(e.task);
    };

    const handleEventProps = (e: CalendarEvent) => {
        return {
            style: {
                background: `var(--color-palette-${e.task.color})`,
                color: "var(--color-main-text)",
            },
        };
    };

    return (
        <div className="calendar-page">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={currentView}
                onView={(view: View) => setCurrentView(view)}
                views={Object.values(CalendarViewMode)}
                date={selectedDate}
                onNavigate={(date: Date) => setSelectedDate(date)}
                defaultView={DEFAULT_CALENDAR_PREFERENCES.currentView}
                scrollToTime={setHours(new Date(), workingHours.start)}
                components={{
                    event: ({ event }) => <Tooltip content={event.title}>{event.title}</Tooltip>,
                }}
                tooltipAccessor={null}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={handleEventProps}
                formats={{
                    timeGutterFormat: "HH:mm",
                    eventTimeRangeFormat: () => "",
                }}
            />
            {taskModal}
        </div>
    );
}
