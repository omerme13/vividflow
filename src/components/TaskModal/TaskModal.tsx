import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const isUserChange = useRef(false);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

    useEffect(() => {
        if (isOpen && isEditMode && task) {
            isUserChange.current = false;
            setName(task.text);
            setLabel(task.label || "");
        } else if (isOpen) {
            setName("");
            setLabel("");
        }
        inputRef.current?.focus();
    }, [isOpen, task, isEditMode]);

    useEffect(() => {
        if (isUserChange.current && isEditMode && task && (name !== task.text || label !== task.label)) {
            updateTask({
                ...task,
                text: name.trim(),
                label: label.trim(),
            });
        }
    }, [name, label, isEditMode, task, updateTask]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        isUserChange.current = true;
        setName(e.target.value);
    };

    const handleLabelChange = (value: string) => {
        isUserChange.current = true;
        setLabel(value);
    };

    const handleClose = () => {
        if (!isEditMode && name.trim()) {
            addTask({
                text: name.trim(),
                label: label.trim(),
            });
        }
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="task-modal__form">
                <div className="task-modal__input-wrapper">
                    <textarea
                        ref={inputRef}
                        className="task-modal__input task-modal__textarea scrollbar"
                        value={name}
                        onChange={handleTextChange}
                        placeholder="Task description"
                    />
                </div>

                <Autocomplete
                    value={label}
                    onChange={handleLabelChange}
                    suggestions={existingLabels}
                    placeholder="Add label"
                />

                <div className="task-modal__actions">
                    <button
                        type="button"
                        className="task-modal__button task-modal__button--secondary"
                        onClick={handleCancel}
                    >
                        {isEditMode ? "Close" : "Cancel"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
