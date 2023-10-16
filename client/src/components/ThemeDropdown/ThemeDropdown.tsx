import React, { FC, useContext } from "react";
import styles from "./ThemeDropdown.module.scss";

import { Theme, ThemeContext } from "../../Context/ThemeContext";

interface ThemeDropdownProps {}

const ThemeDropdown: FC<ThemeDropdownProps> = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.currentTarget.value as Theme;
    setTheme(newTheme);
    localStorage.setItem("dsgt-portal-theme", newTheme);
  };

  return (
    <div className={styles.ThemeDropdown} data-testid="ThemeDropdown">
      <select onChange={handleChange} defaultValue={theme}>
        <option value={Theme.Light}>{Theme.Light}</option>
        <option value={Theme.Dark}>{Theme.Dark}</option>
        <option value={Theme.Black}>{Theme.Black}</option>
        <option value={Theme.Bubblegum}>{Theme.Bubblegum}</option>
        <option value={Theme.Cafe}>{Theme.Cafe}</option>
      </select>
    </div>
  );
};

export default ThemeDropdown;
