import React, { createContext, ReactNode } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext({
    isDarkMode: false
});

interface ThemeContextProps {
    children: ReactNode
}

const ThemeContextProvider = ({ children }: ThemeContextProps) => {
    const isDarkMode = useColorScheme() === 'dark';

    const state = {
        isDarkMode
    };

    return (
        <ThemeContext.Provider value={state}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeContextProvider;