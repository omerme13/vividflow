export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    onClear?: () => void;
    showClearButton?: boolean;
	onFocus?: () => void;
	onKeyDown?: (e: React.KeyboardEvent) => void;
}