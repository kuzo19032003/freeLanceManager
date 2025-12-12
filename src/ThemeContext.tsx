"use client";

import { createContext, useContext, useState } from "react";

const ThemeModeContext = createContext({
    toggle: () => { },
    mode: "light" as "light" | "dark",
});

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const toggle = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeModeContext.Provider value={{ mode, toggle }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export const useThemeMode = () => useContext(ThemeModeContext);
