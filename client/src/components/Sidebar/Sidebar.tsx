import React, { FC, useContext, useEffect, useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import styles from "./Sidebar.module.scss";

import { Theme, ThemeContext } from "../../Context/ThemeContext";

//import all icons
import right_arrow_icon from "../../assets/icons/angle-right.svg";

import home_icon from "../../assets/icons/home.svg";
import settings_icon from "../../assets/icons/settings.svg";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let current_path = window.location.pathname;
    let x = document.querySelector(`div[data-active=true]`);
    x?.removeAttribute("data-active");
    let elem = document.querySelector(`div[data-path="${current_path}"]`);
    if (elem) {
      elem.setAttribute("data-active", "true");
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let active = e.currentTarget.getAttribute("data-active");
    if (!active) {
      //move
      let x = document.querySelector(`div[data-active=true]`);
      x?.removeAttribute("data-active");
      e.currentTarget.setAttribute("data-active", "true");

      //href
      let path = e.currentTarget.getAttribute("data-path");
      if (path) {
        // window.history.pushState({}, "", path); //push to state
        window.location.href = path;
      }
    }
  };

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
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
    <div
      className={`${styles.Sidebar} ${styles[theme]} ${
        open ? styles.Open : styles.Closed
      }`}
      data-testid="Sidebar"
    >
      <div className={styles.OpenClose} onClick={toggleOpen}>
        <img
          src={right_arrow_icon}
          data-open={open}
          alt={open ? "Close Menu" : "Open Menu"}
          title={open ? "Close Menu" : "Open Menu"}
        />
      </div>
      <div className={styles.Header}>
        <h1>DSGT</h1>
      </div>
      <SidebarItem
        onClick={handleClick}
        imgsrc={home_icon}
        open={open}
        path="/portal/home"
        active
      >
        home
      </SidebarItem>
      <SidebarItem
        onClick={handleClick}
        imgsrc={settings_icon}
        open={open}
        path="/portal/settings"
      >
        settings
      </SidebarItem>
      <div className={styles.User}>
        <h1 className={styles.Fname}>
          {localStorage.getItem("dsgt-portal-fname")}
        </h1>
        <h2 className={styles.Role}>
          {localStorage.getItem("dsgt-portal-role")}
        </h2>
      </div>
      <div className={styles.Footer}>
        <button onClick={toggleTheme}>change theme</button>
      </div>
    </div>
  );
};

export default Sidebar;
