import { createContext, useContext } from "react";

export enum Theme {
  Light = "Light",
  Dark = "Dark",
  Black = "Black",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (Theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => console.warn("no theme provider"),
});
export const useTheme = () => useContext(ThemeContext);
