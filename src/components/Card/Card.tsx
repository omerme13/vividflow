import { FC } from "react";
import { CardProps } from "./Card.interface";
import CheckIcon from "@/assets/icons/check.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LabelIcon from "@/assets/icons/label.svg?react";
import ShowMoreIcon from "@/assets/icons/show-more.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";
import PaletteIcon from "@/assets/icons/palette.svg?react";

import "./Card.scss";
import CardAction from "./CardAction";

const markAsDone = () => {};

const setDueDate = () => {};

const addLabel = () => {};

const deleteTask = () => {};

const showMore = () => {};

const openPalette = () => {};

const Card: FC<CardProps> = ({
    text,
    label,
    color,
    isOnKanban,
    isCompleted,
    dueDate,
}) => {
    return (
        <div className="card">
            <div className="card__text">{text}</div>
            {label && <div className="card__label">{label}</div>}
            <div className="card__middle">
                {color ? (
                    <div className="card__color" style={{ background: `var(--color-palette-${color})` }} />
                ) : (
                    <CardAction icon={PaletteIcon} action={openPalette} />
                )}
                <div className="card__actions">
                    <CardAction icon={CheckIcon} action={markAsDone} />
                    <CardAction icon={ClockIcon} action={setDueDate} />
                    <CardAction icon={LabelIcon} action={addLabel} />
                    <CardAction icon={TrashIcon} action={deleteTask} />
                    <CardAction icon={ShowMoreIcon} action={showMore} />
                </div>
            </div>
        </div>
    );
};

export default Card;
