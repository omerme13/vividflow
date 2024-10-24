import { useState } from "react";
import cardsData from "@/data/mockCards.json";
import { generateUniqueId } from "@/utils/helpers";
import Card from "./components/Card/Card";
import { CardData } from "./components/Card/Card.types";

import "./CardsList.scss";

export default function CardList() {
    const [cards, setCards] = useState(cardsData);

    const deleteCard = (id: string) => setCards((prevData) => prevData.filter((card) => card.id !== id));

    return (
        <div className="cards-list">
            {(cards as CardData[]).map((card) => (
                <Card key={generateUniqueId()} card={card} deleteCard={deleteCard} />
            ))}
        </div>
    );
}
