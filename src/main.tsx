import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/global.scss";
import { TaskProvider } from "./context/TaskContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TaskProvider>
            <App />
        </TaskProvider>
    </StrictMode>
);
