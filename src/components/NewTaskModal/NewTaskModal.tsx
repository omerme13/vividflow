import React, { useState, useEffect, useRef } from "react";
import "./NewTaskModal.scss";

interface Task {
    id: string;
    name: string;
    label: string;
}

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Omit<Task, "id">) => void;
    existingLabels: string[];
}

export default function NewTaskModal({ isOpen, onClose, onSubmit, existingLabels }: NewTaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const [showLabelSuggestions, setShowLabelSuggestions] = useState(false);
    const [filteredLabels, setFilteredLabels] = useState<string[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (label) {
            const filtered = existingLabels.filter((existingLabel) =>
                existingLabel.toLowerCase().includes(label.toLowerCase())
            );
            setFilteredLabels(filtered);
        } else {
            setFilteredLabels(existingLabels);
        }
    }, [label, existingLabels]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit({
                name: name.trim(),
                label: label.trim(),
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setName("");
        setLabel("");
        setShowLabelSuggestions(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="new-task-modal">
            <div className="new-task-modal__overlay">
                <div className="new-task-modal__content" ref={modalRef}>
                    <h2 className="new-task-modal__title">New Task</h2>

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
                                onFocus={() => setShowLabelSuggestions(true)}
                                placeholder="Add label"
                            />

                            {showLabelSuggestions && filteredLabels.length > 0 && (
                                <div className="new-task-modal__suggestions">
                                    {filteredLabels.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            className="new-task-modal__suggestion-item"
                                            onClick={() => {
                                                setLabel(suggestion);
                                                setShowLabelSuggestions(false);
                                            }}
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
