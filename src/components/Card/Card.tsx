import { FC } from "react";
import { CardProps } from "./Card.interface";
import CheckIcon from "@/assets/icons/check.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import LabelIcon from "@/assets/icons/label.svg?react";
import ShowMoreIcon from "@/assets/icons/show-more.svg?react";
import TrashIcon from "@/assets/icons/trash.svg?react";

import "./Card.scss";
import CardAction from "./CardAction";

const markAsDone = () => {
	
};

const setDueDate= () => {
	
};

const addLabel= () => {
	
};

const deleteTask = () => {
	
};

const showMore = () => {
	
}

const Card: FC<CardProps> = ({ text }) => {
    return (
        <div className="card">
            {text}
            <div className="card__middle">
                <div className="card__color" />
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
