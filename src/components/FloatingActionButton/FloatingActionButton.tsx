import { FloatingActionButtonProps } from "./FloatingActionButton.types";

import "./FloatingActionButton.scss";

export default function FloatingActionButton({ onClick, className = "", icon: Icon }: FloatingActionButtonProps) {
    return (
        <button className={`floating-action-button ${className}`} onClick={onClick} type="button">
            <Icon />
        </button>
    );
}
