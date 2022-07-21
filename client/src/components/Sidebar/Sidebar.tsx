import React, { FC, useContext } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import styles from "./Sidebar.module.scss";

import { Theme, ThemeContext } from "../../Context/ThemeContext";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let active = e.currentTarget.getAttribute("data-active");
    if (!active) {
      //move
      let x = document.querySelector(`div[data-active=true`);
      x?.removeAttribute("data-active");
      e.currentTarget.setAttribute("data-active", "true");
    }
  };

  const toggleTheme = () => {
    if (theme === Theme.Light) {
      setTheme(Theme.Dark);
      localStorage.setItem("dsgt-portal-theme", Theme.Dark);
    } else if (theme === Theme.Dark) {
      setTheme(Theme.Black);
      localStorage.setItem("dsgt-portal-theme", Theme.Black);
    } else {
      setTheme(Theme.Light);
      localStorage.setItem("dsgt-portal-theme", Theme.Light);
    }
  };

  return (
    <div className={`${styles.Sidebar} ${styles[theme]}`} data-testid="Sidebar">
      <div className={styles.Header}>
        <h1>DSGT</h1>
      </div>
      <SidebarItem onClick={handleClick} active>
        test
      </SidebarItem>
      <SidebarItem onClick={handleClick}>test1</SidebarItem>
      <div className={styles.Footer}>
        <button onClick={toggleTheme}>change theme</button>
      </div>
    </div>
  );
};

export default Sidebar;
