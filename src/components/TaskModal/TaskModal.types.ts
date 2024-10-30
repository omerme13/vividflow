import { TaskData } from '@/components/Task';

export interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: TaskData;
    isEditMode: boolean;
}