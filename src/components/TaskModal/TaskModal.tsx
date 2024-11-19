import { useEffect, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useTaskContext } from "@/context/TaskContext";
import { TaskModalProps } from "./TaskModal.types";
import Autocomplete from "@/components/Autocomplete";
import ColorPicker from "@/components/ColorPicker";
import { TaskColors } from "@/components/Task";
import { TrashIcon } from "@/assets/icons";
import useDeleteTask from "@/hooks/useDeleteTask";

import "./TaskModal.scss";

export default function TaskModal({ isOpen, onClose, task, isEditMode, dueDate }: TaskModalProps) {
    const [text, setText] = useState("");
    const [label, setLabel] = useState("");
    const [selectedColor, setSelectedColor] = useState<TaskColors | undefined>(TaskColors.Gray);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { addTask, updateTask, labels: existingLabels } = useTaskContext();
    const handleDeleteTask = useDeleteTask(task?.id, onClose);

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
                    ...(dueDate && { dueDate }),
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
                <Autocomplete
                    value={label}
                    onChange={setLabel}
                    suggestions={existingLabels}
                    placeholder="Add label"
                    resetValue={() => setLabel("")}
                />
                <ColorPicker color={selectedColor} onChangeColor={handleColorChange} isMulti={false} />
                {isEditMode && (
                    <button className="task-modal__delete-button" onClick={handleDeleteTask} type="button">
                        <TrashIcon width={16} height={16} />
                        <span>Delete task</span>
                    </button>
                )}
            </div>
        </Modal>
    );
}
