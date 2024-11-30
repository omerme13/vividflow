import ReactDatePicker from "react-datepicker";
import Popover from "@/components/Popover";
import { MouseEvent, useState } from "react";
import { CloseIcon } from "@/assets/icons";
import { DatePickerProps } from "./types";
import { usePreferences } from "@/context/PreferenceContext";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

export default function DatePicker({ date, onChange, trigger }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
	const { preferences: { dateFormat, hourFormat }} = usePreferences();

    const handleDateChange = (date: Date | null, e: unknown) => {
        if (date) onChange(date);
        if (!e) setIsOpen(false);
    };

    const handleClearDate = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        onChange(undefined);
        setIsOpen(false);
    };

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen} trigger={trigger}>
            <div className="datepicker-wrapper">
                {date && (
                    <button className="datepicker-wrapper__clear-button" onClick={handleClearDate} type="button">
                        <CloseIcon width={16} height={16} />
                        <span>Clear date</span>
                    </button>
                )}
                <ReactDatePicker
                    selected={date ? new Date(date) : null}
                    onChange={handleDateChange}
                    dateFormat={dateFormat}
                    minDate={new Date()}
                    inline
                    showTimeSelect
                    timeFormat={hourFormat}
                    timeCaption="Time"
                    timeIntervals={30}
                />
            </div>
        </Popover>
    );
}
