import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PreferencesProvider } from "./context/PreferenceContext.tsx";

import "./styles/global.scss";
import { LayoutProvider } from "./context/LayoutContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PreferencesProvider>
            <LayoutProvider>
                <App />
            </LayoutProvider>
        </PreferencesProvider>
    </StrictMode>
);
