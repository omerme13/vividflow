import { InputProps } from "./Input.types";
import { CloseIcon } from "@/assets/icons";

import "./Input.scss";

export default function Input({
    value,
    onChange,
    placeholder = "",
    className = "",
    onClear,
    showClearButton = true,
	onFocus,
	onKeyDown,
}: InputProps) {
    return (
        <div className={`input ${className}`}>
            <input
                className="input__field"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
            />
            {showClearButton && value && (
                <CloseIcon 
                    className="input__clear-icon" 
                    width={18} 
                    height={18} 
                    onClick={onClear}
                />
            )}
        </div>
    );
}
