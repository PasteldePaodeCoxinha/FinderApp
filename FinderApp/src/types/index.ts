export interface ThemeContextProps {
    theme: ThemeProps;
    setTheme: React.Dispatch<React.SetStateAction<ThemeProps>>;
}

export interface ThemeProps {
    colors: {
        background: string;
        primary: string;
        secondary: string;
        text: string;
        border: string;
        msgBG: string;
    }
}
