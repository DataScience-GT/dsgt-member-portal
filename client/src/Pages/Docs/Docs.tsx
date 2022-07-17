import React, { FC, useEffect, useState } from "react";
import styles from "./Docs.module.scss";

import FlexRow from "../../layout/FlexRow/FlexRow";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import DocsSidebarSection from "../../components/Docs/DocsSidebarSection/DocsSidebarSection";
import DocsSidebarItem, {
  RequestType,
} from "../../components/Docs/DocsSidebarItem/DocsSidebarItem";

import { Routes, Route } from "react-router-dom";
import DocsWelcome from "./DocsWelcome/DocsWelcome";
import DocsApi from "./DocsApi/DocsApi";
import DocsApiUser from "./DocsApiUser/DocsApiUser";

interface DocsProps {}

const Docs: FC<DocsProps> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    document.title = "Api Docs";
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuOpen(e.target.checked);
  };

  const handleScroll = (e: Event) => {
    let newScroll = window.scrollY;

    let dy = newScroll - scrollY;
    console.log(dy);
    if (dy > 0 && !menuOpen) {
      setHeaderHidden(true);
    } else {
      setHeaderHidden(false);
    }
    setScrollY(newScroll);
  };

  return (
    <div className={styles.Docs} data-testid="Docs">
      <div
        className={`${styles.DocsHeader} ${
          headerHidden ? styles._headerHidden : ""
        }`}
      >
        <div className={styles.hamburger}>
          <input
            id="nav-menu-checkbox"
            className={styles.NavCheckbox}
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="nav-menu-checkbox">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        DSGT Member Portal API
      </div>
      <div className={styles.DocsBody}>
        <FlexRow padding="5em 0 0 0">
          <div
            className={`${styles.DocsSidebar} ${
              menuOpen ? styles._menuOpen : ""
            }`}
          >
            <FlexColumn>
              <DocsSidebarSection label="Welcome" route="/docs/welcome#0">
                <DocsSidebarItem
                  label="Introduction"
                  route="/docs/welcome#introduction"
                />
                <DocsSidebarItem
                  label="API Info"
                  route="/docs/welcome#api-info"
                />
                <DocsSidebarItem
                  label="API Stack"
                  route="/docs/welcome#api-stack"
                />
                <DocsSidebarItem
                  label="Getting Started"
                  route="/docs/welcome#getting-started"
                />
                <DocsSidebarItem
                  label="Authentication"
                  route="/docs/welcome#authentication"
                />
                <DocsSidebarItem
                  label="Input/Output Data"
                  route="/docs/welcome#data"
                />
                <DocsSidebarItem
                  label="Credits"
                  route="/docs/welcome#credits"
                />
              </DocsSidebarSection>
              <DocsSidebarSection label="/api" route="/docs/api#0">
                <DocsSidebarItem
                  requestType={RequestType.GET}
                  label="/api/"
                  route="/docs/api#api"
                />
                <DocsSidebarItem
                  requestType={RequestType.GET}
                  label="/api/auth"
                  route="/docs/api#auth"
                />
              </DocsSidebarSection>
              <DocsSidebarSection label="/api/user" route="/docs/api/user#0">
                <DocsSidebarItem
                  requestType={RequestType.GET}
                  label="/api/user"
                  route="/docs/api/user#user"
                />
                <DocsSidebarItem
                  requestType={RequestType.GET}
                  label="/api/user/get"
                  route="/docs/api/user#get"
                />
                <DocsSidebarItem
                  requestType={RequestType.POST}
                  label="/api/user/login"
                  route="/docs/api/user#login"
                />
                <DocsSidebarItem
                  requestType={RequestType.POST}
                  label="/api/user/register"
                  route="/docs/api/user#register"
                />
              </DocsSidebarSection>
            </FlexColumn>
          </div>
          <div className={styles.DocsContent}>
            {/* DOCS CONTENT (IN PAGE FORM) */}
            <Routes>
              <Route path="/*" element={<DocsWelcome />} />
              <Route path="/welcome" element={<DocsWelcome />} />
              <Route path="/api" element={<DocsApi />} />
              <Route path="/api/user" element={<DocsApiUser />} />
            </Routes>
          </div>
        </FlexRow>
      </div>
    </div>
  );
};
export default Docs;
