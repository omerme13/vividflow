import { Calendar, dateFnsLocalizer, View, EventPropGetter, SlotInfo } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import { CalendarEvent, CalendarViewMode } from "@/types/calendar";
import { format, parse, startOfWeek, getDay, setHours } from "date-fns";
import { enUS } from "date-fns/locale";
import { useCalendar } from "@/context/CalendarContext";
import { DEFAULT_CALENDAR_PREFERENCES } from "@/utils/constants";
import Tooltip from "@/components/Tooltip";
import useTaskModal from "@/hooks/useTaskModal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskData } from "@/types/task";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarPage.scss";
import { usePreferences } from "@/context/PreferenceContext";

const DnDCalendar = withDragAndDrop<CalendarEvent, object>(Calendar);

export default function CalendarPage() {
    const { events, currentView, setCurrentView, selectedDate, setSelectedDate, workingHours } = useCalendar();
    const { updateTask } = useTaskContext();
    const { taskModal, handleEdit, toggleTaskModal, setDueDate } = useTaskModal();
    const {
        preferences: { hourFormat, dateFormat },
    } = usePreferences();

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

    const handleEventProps: EventPropGetter<CalendarEvent> = (event) => {
        return { style: event.style };
    };

    const moveEvent: withDragAndDropProps["onEventDrop"] = ({ event, start }) => {
        const calendarEvent = event as CalendarEvent;

        const updatedTask: TaskData = {
            ...calendarEvent.task,
            dueDate: new Date(start).toISOString(),
        };

        updateTask(updatedTask);
    };

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        toggleTaskModal();
        setDueDate(slotInfo.slots[0].toISOString());
    };

    return (
        <div className="calendar-page">
            <DnDCalendar
                localizer={localizer}
                events={events}
                view={currentView as View}
                onView={(view: View) => setCurrentView(view as CalendarViewMode)}
                views={Object.values(CalendarViewMode)}
                date={selectedDate}
                onNavigate={(date: Date) => setSelectedDate(date)}
                defaultView={DEFAULT_CALENDAR_PREFERENCES.currentView}
                scrollToTime={setHours(new Date(), workingHours.start)}
                components={{
                    event: ({ event }: { event: CalendarEvent }) => (
                        <Tooltip content={`${format(event.start!, hourFormat)} ${event.title}`}>{event.title}</Tooltip>
                    ),
                }}
                tooltipAccessor={null}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={handleEventProps}
                formats={{
                    timeGutterFormat: hourFormat,
                    eventTimeRangeFormat: ({ start }: { start: Date }) => format(start, hourFormat),
                    agendaTimeRangeFormat: ({ start }: { start: Date }) => format(start, hourFormat),
                    agendaDateFormat: dateFormat,
                }}
                onEventDrop={moveEvent}
                resizable={false}
                selectable
                onSelectSlot={handleSelectSlot}
                longPressThreshold={1}
                timeslots={1}
                onSelecting={() => false}
            />
            {taskModal}
        </div>
    );
}
