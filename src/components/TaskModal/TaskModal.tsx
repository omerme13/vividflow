import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [text, setText] = useState("");
    const [label, setLabel] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

    useEffect(() => {
        if (isOpen && isEditMode && task) {
            setText(task.text);
            setLabel(task.label || "");
        } else if (isOpen) {
            setText("");
            setLabel("");
        }
        inputRef.current?.focus();
    }, [isOpen, task, isEditMode]);

    const handleClose = () => {
        if (text.trim()) {
            if (isEditMode && task) {
                updateTask({
                    ...task,
                    text: text.trim(),
                    label: label.trim(),
                });
            } else {
                addTask({
                    text: text.trim(),
                    label: label.trim(),
                });
            }
        }
        onClose();
    };


    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="task-modal__form">
                <div className="task-modal__input-wrapper">
                    <textarea
                        ref={inputRef}
                        className="task-modal__input task-modal__textarea scrollbar"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Task description"
                    />
                </div>
                <Autocomplete value={label} onChange={setLabel} suggestions={existingLabels} placeholder="Add label" />
            </div>
        </Modal>
    );
}
