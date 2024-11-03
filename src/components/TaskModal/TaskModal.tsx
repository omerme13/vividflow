import React, { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

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
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="task-modal__form" onSubmit={handleSubmit}>
                <div className="task-modal__input-wrapper">
                    <textarea
                        ref={inputRef}
                        className="task-modal__input task-modal__textarea"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Task description"
                    />
                </div>

                <Autocomplete value={label} onChange={setLabel} suggestions={existingLabels} placeholder="Add label" />

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
