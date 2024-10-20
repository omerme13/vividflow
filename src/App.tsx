import { FC } from "react";

import "./App.scss";
import Card from '@/components/Card/Card';

const App: FC = () => {
    return (
        <div className="app">
            <Card text="Find Nemo" />
        </div>
    );
};

export default App;
