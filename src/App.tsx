import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { PreferencesProvider } from "./context/PreferenceContext";
import { LayoutProvider } from "./context/LayoutContext";

import "./App.scss";

export default function App() {
    return (
        <PreferencesProvider>
            <LayoutProvider>
                <RouterProvider router={router} />;
            </LayoutProvider>
        </PreferencesProvider>
    );
}
