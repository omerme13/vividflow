import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import useClickOutside from "@/hooks/useClickOutside";
import useSuggestions from "@/hooks/useSuggestion";
import { TaskModalProps } from "./TaskModal.types";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

    const { filteredSuggestions, selectedIndex, setSelectedIndex, showSuggestions, setShowSuggestions, handleKeyDown } =
        useSuggestions({
            inputValue: label,
            suggestions: existingLabels,
            onSelect: (suggestion) => {
                setLabel(suggestion);
                setShowSuggestions(false);
            },
        });

    useClickOutside({
        refs: [suggestionsRef],
        handler: () => setShowSuggestions(false),
        enabled: showSuggestions,
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && task) {
                setName(task.text);
                setLabel(task.label || "");
            } else {
                setName("");
                setLabel("");
            }
			
			inputRef.current?.focus();
        }
    }, [isOpen, task, isEditMode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        const taskData = {
            text: name.trim(),
            label: label.trim(),
        };

        if (isEditMode && task) {
            updateTask({ ...task, ...taskData });
        } else {
            addTask(taskData);
        }
        handleClose();
    };

    const handleClose = () => {
        setShowSuggestions(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="task-modal__form" onSubmit={handleSubmit}>
                <div className="task-modal__input-wrapper">
                    <input
                        ref={inputRef}
                        className="task-modal__input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Task name"
                    />
                </div>

                <div className="task-modal__input-wrapper">
                    <input
                        className="task-modal__input task-modal__input--label"
                        type="text"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add label"
                    />

                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="task-modal__suggestions" ref={suggestionsRef}>
                            {filteredSuggestions.map((suggestion, index) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    className={`task-modal__suggestion-item ${
                                        index === selectedIndex ? "task-modal__suggestion-item--selected" : ""
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

                <div className="task-modal__actions">
                    <button
                        type="button"
                        className="task-modal__button task-modal__button--secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="task-modal__button task-modal__button--primary"
                        disabled={!name.trim()}
                    >
                        {isEditMode ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
