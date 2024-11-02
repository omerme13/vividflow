import { useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./Modal.types";
import useClickOutside from "@/hooks/useClickOutside";

import "./Modal.scss";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        refs: [modalRef],
        handler: onClose,
        enabled: isOpen,
    });

    if (!isOpen) return null;

    return createPortal(
        <div className="modal">
            <div className="modal__overlay">
                <div className="modal__content" ref={modalRef}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
