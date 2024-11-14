import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <Toaster position="bottom-right" />
    </StrictMode>
);
