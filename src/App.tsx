import { FC } from "react";

import "./App.scss";
import CardsList from "@/components/CardsList/CardsList";

const App: FC = () => {
    return (
        <div className="app">
			<CardsList />
        </div>
    );
};

export default App;
