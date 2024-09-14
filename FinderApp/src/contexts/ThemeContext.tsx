import { createContext, useState } from "react";
import { ThemeContextProps, ThemeProps } from "../types";

export const ThemeContext = createContext({} as ThemeContextProps);

export function ThemeProvider({ children }: any) {
    const [theme, setTheme] = useState({
        colors: {
            background: "#FFF9F9",
            primary: "#F05050",
            secondary: "#F05050",
            text: "#1E1E1E",
            border: "#F05050"
        }
    } as ThemeProps);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}