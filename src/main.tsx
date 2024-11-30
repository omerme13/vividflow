import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CustomToaster from "@/layouts/CustomToaster";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
		<CustomToaster />
    </StrictMode>
);
