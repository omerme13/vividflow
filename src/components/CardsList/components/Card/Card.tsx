import { useState } from "react";
import { CardColors, CardProps } from "./Card.types";
import CheckIcon from "@/assets/icons/check.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LabelIcon from "@/assets/icons/label.svg?react";
import ShowMoreIcon from "@/assets/icons/show-more.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import PaletteIcon from "@/assets/icons/palette.svg?react";
import CardAction from "./CardAction";
import { getPaletteColor } from "@/utils/styles";
import ColorPalette from "./ColorPalette";

import "./Card.scss";

const markAsDone = () => {};

const setDueDate = () => {};

const addLabel = () => {};

const showMore = () => {};

export default function Card({ card: { id, text, label, color, isOnKanban, isCompleted, dueDate }, deleteCard }: CardProps) {
	// TODO instead of undefined. Make the default color to lightgray from the variables
    const [cardColor, setCardColor] = useState<CardColors | undefined>(color);
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const togglePalette = () => setIsPaletteOpen((value) => !value);

    return (
        <div className="card">
            <div className="card__color" style={{ background: getPaletteColor(cardColor) }} />
            <div className="card__text">{text}</div>
            {label && <div className="card__label">{label}</div>}
            <div className="card__middle">
                <div className="card__actions">
                    <CardAction icon={CheckIcon} action={markAsDone} />
                    <CardAction icon={ClockIcon} action={setDueDate} />
                    <CardAction icon={LabelIcon} action={addLabel} />
                    <CardAction icon={TrashIcon} action={() => deleteCard(id)} isWarning />
                    <CardAction icon={PaletteIcon} action={togglePalette} />
                    {isPaletteOpen && (
                        <ColorPalette setCardColor={setCardColor} onClose={() => setIsPaletteOpen(false)} />
                    )}
                    <CardAction icon={ShowMoreIcon} action={showMore} />
                </div>
            </div>
        </div>
    );
}