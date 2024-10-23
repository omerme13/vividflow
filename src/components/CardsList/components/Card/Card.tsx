import { FC } from "react";
import { CardProps } from "./Card.types";
import CheckIcon from "@/assets/icons/check.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LabelIcon from "@/assets/icons/label.svg?react";
import ShowMoreIcon from "@/assets/icons/show-more.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import PaletteIcon from "@/assets/icons/palette.svg?react";
import CardAction from "./CardAction";
import { getPaletteColor } from "@/utils/styles";

import "./Card.scss";

const markAsDone = () => {};

const setDueDate = () => {};

const addLabel = () => {};

const showMore = () => {};

const openPalette = () => {};

const Card: FC<CardProps> = ({ card: { id, text, label, color, isOnKanban, isCompleted, dueDate }, deleteCard }) => {
    return (
        <div className="card">
            <div className="card__color" style={{ background: getPaletteColor(color) }} />
            <div className="card__text">{text}</div>
            {label && <div className="card__label">{label}</div>}
            <div className="card__middle">
                <div className="card__actions">
                    <CardAction icon={CheckIcon} action={markAsDone} />
                    <CardAction icon={ClockIcon} action={setDueDate} />
                    <CardAction icon={LabelIcon} action={addLabel} />
                    <CardAction icon={TrashIcon} action={() => deleteCard(id)} isWarning />
                    <CardAction icon={PaletteIcon} action={openPalette} />
                    <CardAction icon={ShowMoreIcon} action={showMore} />
                </div>
            </div>
        </div>
    );
};

export default Card;
