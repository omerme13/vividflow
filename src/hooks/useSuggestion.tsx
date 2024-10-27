import { useState, useEffect } from "react";

interface UseSuggestionsResult {
    filteredSuggestions: string[];
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
}

interface UseSuggestionsProps {
    inputValue: string;
    suggestions: string[];
    onSelect: (value: string) => void;
    maxSuggestions?: number;
}

export default function useSuggestions({
    inputValue,
    suggestions,
    onSelect,
    maxSuggestions = 5,
}: UseSuggestionsProps): UseSuggestionsResult {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (!inputValue.trim()) {
            setFilteredSuggestions(suggestions.slice(0, maxSuggestions));
        } else {
            const filtered = suggestions
                .filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase().trim()))
                .slice(0, maxSuggestions);
            setFilteredSuggestions(filtered);
        }
        setSelectedIndex(-1);
    }, [inputValue, suggestions, maxSuggestions]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || filteredSuggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : 0));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredSuggestions.length - 1));
                break;
            case "Enter":
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    onSelect(filteredSuggestions[selectedIndex]);
                    setShowSuggestions(false);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                break;
        }
    };

    return {
        filteredSuggestions,
        selectedIndex,
        setSelectedIndex,
        showSuggestions,
        setShowSuggestions,
        handleKeyDown,
    };
}
