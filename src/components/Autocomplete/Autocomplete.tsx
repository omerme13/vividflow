import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import useSuggestions from './useSuggestion';
import { AutocompleteProps } from "./Autocomplete.types";

import "./Autocomplete.scss";

export default function Autocomplete({
    value,
    onChange,
    suggestions: existingSuggestions,
    placeholder = "",
    className = "",
}: AutocompleteProps) {
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const { filteredSuggestions, selectedIndex, setSelectedIndex, showSuggestions, setShowSuggestions, handleKeyDown } =
        useSuggestions({
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
        <div className={`autocomplete__wrapper ${className}`}>
            <input
                className="autocomplete__input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
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
