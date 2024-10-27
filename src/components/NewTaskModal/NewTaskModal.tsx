import React, { useState, useRef } from "react";
import { useTaskContext } from "@/context/TaskContext";
import useSuggestions from "@/hooks/useSuggestion";
import useClickOutside from "@/hooks/useClickOutside";

import "./NewTaskModal.scss";

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewTaskModal({ isOpen, onClose }: NewTaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const { addTask, labels: existingLabels } = useTaskContext();

    const { 
        filteredSuggestions, 
        selectedIndex, 
        setSelectedIndex, 
        showSuggestions, 
        setShowSuggestions, 
        handleKeyDown 
    } = useSuggestions({
        inputValue: label,
        suggestions: existingLabels,
        onSelect: (suggestion) => {
            setLabel(suggestion);
            setShowSuggestions(false);
        },
    });

    useClickOutside({
        refs: [modalRef],
        handler: onClose,
        enabled: isOpen,
    });

    useClickOutside({
        refs: [suggestionsRef, inputRef],
        handler: () => setShowSuggestions(false),
        enabled: showSuggestions,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addTask({
                text: name.trim(),
                label: label.trim(),
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setName("");
        setLabel("");
        setShowSuggestions(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="new-task-modal">
            <div className="new-task-modal__overlay">
                <div className="new-task-modal__content" ref={modalRef}>
                    <form className="new-task-modal__form" onSubmit={handleSubmit}>
                        <div className="new-task-modal__input-wrapper">
                            <input
                                ref={inputRef}
                                className="new-task-modal__input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Task name"
                            />
                        </div>

                        <div className="new-task-modal__input-wrapper">
                            <input
                                className="new-task-modal__input"
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                onFocus={() => setShowSuggestions(true)}
                                onKeyDown={handleKeyDown}
                                placeholder="Add label"
                            />

                            {showSuggestions && filteredSuggestions.length > 0 && (
                                <div className="new-task-modal__suggestions" ref={suggestionsRef}>
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            className={`new-task-modal__suggestion-item ${
                                                index === selectedIndex ? "new-task-modal__suggestion-item--selected" : ""
                                            }`}
                                            onClick={() => {
                                                setLabel(suggestion);
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

                        <div className="new-task-modal__actions">
                            <button
                                type="button"
                                className="new-task-modal__button new-task-modal__button--secondary"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="new-task-modal__button new-task-modal__button--primary"
                                disabled={!name.trim()}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}