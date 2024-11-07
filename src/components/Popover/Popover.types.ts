export interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    triggerClassName?: string;
    marginFromBorders?: number;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}
