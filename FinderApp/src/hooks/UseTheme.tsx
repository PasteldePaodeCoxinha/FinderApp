import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}