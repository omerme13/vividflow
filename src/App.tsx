import { FC } from "react";

import CardsList from "@/components/CardsList/CardsList";
import Sidebar from "@/components/Sidebar/Sidebar";

import "./App.scss";

const App: FC = () => {
    return (
        <div className="app">
			<Sidebar />
			<CardsList />
        </div>
    );
};

export default App;
