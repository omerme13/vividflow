import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";
import ColorPicker from "@/components/ColorPicker";
import { TaskColors } from "@/components/Task";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode }: TaskModalProps) {
    const [text, setText] = useState("");
    const [label, setLabel] = useState("");
    const [selectedColor, setSelectedColor] = useState<TaskColors | undefined>(TaskColors.Gray);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();

    useEffect(() => {
        if (isOpen && isEditMode && task) {
            setText(task.text);
            setLabel(task.label || "");
            setSelectedColor(task.color!);
        } else if (isOpen) {
            setText("");
            setLabel("");
            setSelectedColor(TaskColors.Gray);
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
                    color: selectedColor,
                });
            } else {
                addTask({
                    text: text.trim(),
                    label: label.trim(),
                    color: selectedColor,
                });
            }
        }
        onClose();
    };

    const handleColorChange = (color: TaskColors | undefined) => {
        setSelectedColor(color);
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
                <ColorPicker
                    color={selectedColor}
                    onChangeColor={handleColorChange}
					isMulti={false}
                />
            </div>
        </Modal>
    );
}
