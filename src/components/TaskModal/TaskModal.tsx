import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";
import useDebouncedValue from "@/hooks/useDebouncedValue";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [name, setName] = useState("");
    const [label, setLabel] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

    const debouncedName = useDebouncedValue(name);
    const debouncedLabel = useDebouncedValue(label);

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

    useEffect(() => {
        if (isEditMode && task && (debouncedName !== task.text || debouncedLabel !== task.label)) {
            updateTask({
                ...task,
                text: debouncedName.trim(),
                label: debouncedLabel.trim(),
            });
        }
    }, [debouncedName, debouncedLabel, isEditMode, task, updateTask]);

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
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Task description"
                    />
                </div>

                <Autocomplete value={label} onChange={setLabel} suggestions={existingLabels} placeholder="Add label" />

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
