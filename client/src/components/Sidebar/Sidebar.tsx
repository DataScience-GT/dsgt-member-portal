import React, { FC, useContext, useEffect, useState } from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import styles from "./Sidebar.module.scss";

import { Theme, ThemeContext } from "../../Context/ThemeContext";

import { compareUserRoles, getRoleValue } from "../../Scripts/RoleManagement";

//import all icons
import right_arrow_icon from "../../assets/icons/angle-right.svg";

import home_icon from "../../assets/icons/home.svg";
import settings_icon from "../../assets/icons/settings.svg";
import members_icon from "../../assets/icons/users-alt.svg";
import megaphone_icon from "../../assets/icons/megaphone.svg";
import account_icon from "../../assets/icons/portrait.svg";
import events_icon from "../../assets/icons/calendars.svg";
import forms_icon from "../../assets/icons/form.svg";

import logout_icon from "../../assets/icons/sign-out-alt.svg";

interface SidebarProps {
  role?: string;
}

const Sidebar: FC<SidebarProps> = ({ role }: SidebarProps) => {
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

  const Logout = () => {
    localStorage.removeItem("dsgt-portal-session-key");
    window.location.href = "/";
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
      <div className={styles.SidebarItems}>
        <SidebarItem
          onClick={handleClick}
          imgsrc={home_icon}
          open={open}
          path="/portal/home"
          active
        >
          Home
        </SidebarItem>
        {compareUserRoles(role || "guest", "moderator") >= 0 ? (
          <SidebarItem
            onClick={handleClick}
            imgsrc={forms_icon}
            open={open}
            path="/portal/forms"
          >
            Forms
          </SidebarItem>
        ) : (
          ""
        )}
        {compareUserRoles(role || "guest", "moderator") >= 0 ? (
          <SidebarItem
            onClick={handleClick}
            imgsrc={events_icon}
            open={open}
            path="/portal/event"
          >
            Events
          </SidebarItem>
        ) : (
          ""
        )}
        {compareUserRoles(role || "guest", "moderator") >= 0 ? (
          <SidebarItem
            onClick={handleClick}
            imgsrc={members_icon}
            open={open}
            path="/portal/members"
          >
            Members
          </SidebarItem>
        ) : (
          ""
        )}
        {compareUserRoles(role || "guest", "moderator") >= 0 ? (
          <SidebarItem
            onClick={handleClick}
            imgsrc={megaphone_icon}
            open={open}
            path="/portal/announce"
          >
            Announce
          </SidebarItem>
        ) : (
          ""
        )}
        <SidebarItem
          onClick={handleClick}
          imgsrc={account_icon}
          open={open}
          path="/portal/account"
        >
          Account
        </SidebarItem>
        <SidebarItem
          onClick={handleClick}
          imgsrc={settings_icon}
          open={open}
          path="/portal/settings"
        >
          Settings
        </SidebarItem>
      </div>
      <div className={styles.User}>
        <h1 className={styles.Fname}>
          {localStorage.getItem("dsgt-portal-fname")}
        </h1>
        <h2 className={styles.Role}>
          {localStorage.getItem("dsgt-portal-role")}
        </h2>
      </div>
      <div className={styles.Logout}>
        <div
          className={`${styles.LogoutWrapper} ${
            open ? styles.Open : styles.Closed
          }`}
          onClick={Logout}
          title="Logout"
        >
          <img className={styles.Icon} src={logout_icon} alt="Logout Icon" />
          <p className={styles.ItemText}>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
