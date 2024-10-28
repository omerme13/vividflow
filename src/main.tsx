import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PreferencesProvider } from "./context/PreferenceContext.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";

import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PreferencesProvider>
            <TaskProvider>
                <App />
            </TaskProvider>
        </PreferencesProvider>
    </StrictMode>
);
