import { FC } from "react";


import "./App.scss";
import Sidebar from "@/components/Sidebar";
import CardsList from "@/components/CardsList";

const App: FC = () => {
    return (
        <div className="app">
			<Sidebar />
			<CardsList />
        </div>
    );
};

export default App;
