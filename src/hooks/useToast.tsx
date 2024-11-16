import toast, { ToastPosition } from "react-hot-toast";

export enum ToastType {
    Success = "success",
    Error = "error",
    Loading = "loading",
}

export interface UseToastProps {
    type?: ToastType;
    text: string;
    duration?: number;
    position?: ToastPosition;
    icon?: string | JSX.Element;
    className?: string;
    action?: {
        text: string;
        onClick: (value: any) => void;
    };
}

export default function useToast({
    type,
    text,
    duration = 5000,
    position = "bottom-right",
    icon,
    className,
    action,
}: UseToastProps) {
    return () => {
        const options = {
            duration,
            position,
            icon,
            className,
            ...(action && {
                action: {
                    label: action.text,
                    onClick: action.onClick,
                },
            }),
        };

        return type ? toast[type](text, options) : toast(text, options);
    };
}
