import { FC } from "react";

import "./App.scss";
import Card from "@/components/Card/Card";
import cards from "@/data/mockCards.json";
import { CardColors } from "@/components/Card/Card.interface";

const App: FC = () => {
    return (
        <div className="app">
            <div className="cards-container">
                {cards.map(({ text, label, color, isCompleted, isOnKanban, dueDate }) => (
                    <Card {...{ text, label, color: color as CardColors, isCompleted, isOnKanban, dueDate }} />
                ))}
            </div>
        </div>
    );
};

export default App;
