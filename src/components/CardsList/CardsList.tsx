import { FC } from "react";
import cards from "@/data/mockCards.json";
import { generateUniqueId } from "@/utils/helpers";
import Card from "./Card/Card";
import { ICard } from "./Card/Card.interface";

import "./CardsList.scss";

const CardsList: FC = () => {
    return (
        <div className="cards-list">
            {(cards as ICard[]).map((card) => (
                <Card key={generateUniqueId()} card={card} />
            ))}
        </div>
    );
};

export default CardsList;
