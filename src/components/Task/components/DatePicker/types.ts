export interface DatePickerProps {
    date: Date | undefined;
    onChange: (date: Date | undefined) => void;
    trigger: React.ReactNode;
}