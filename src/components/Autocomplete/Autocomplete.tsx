import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import useSuggestions from "@/hooks/useSuggestion";
import { AutocompleteProps } from "./Autocomplete.types";
import Input from "../Input/Input";
import "./Autocomplete.scss";

export default function Autocomplete({
    value,
    onChange,
    suggestions: existingSuggestions,
    placeholder = "",
    className = "",
    resetValue,
}: AutocompleteProps) {
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const {
        filteredSuggestions,
        selectedIndex,
        setSelectedIndex,
        showSuggestions,
        setShowSuggestions,
        handleKeyDown,
        clearSuggestions,
    } = useSuggestions({
        inputValue: value,
        suggestions: existingSuggestions,
        onSelect: (suggestion) => {
            onChange(suggestion);
            setShowSuggestions(false);
        },
    });

    useClickOutside({
        refs: [suggestionsRef],
        handler: () => setShowSuggestions(false),
        enabled: showSuggestions,
    });

    return (
        <div className={`autocomplete ${className}`}>
            <Input
                value={value}
                onChange={(newValue) => onChange(newValue)}
                onClear={() => {
                    clearSuggestions();
                    resetValue();
                }}
                placeholder={placeholder}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="autocomplete__suggestions scrollbar" ref={suggestionsRef}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <button
                            key={suggestion}
                            type="button"
                            className={`autocomplete__suggestion-item ${
                                index === selectedIndex ? "autocomplete__suggestion-item--selected" : ""
                            }`}
                            onClick={() => {
                                onChange(suggestion);
                                setShowSuggestions(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
