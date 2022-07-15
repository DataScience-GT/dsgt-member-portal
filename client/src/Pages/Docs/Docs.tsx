import React, { FC, useEffect } from "react";
import styles from "./Docs.module.scss";

import FlexRow from "../../layout/FlexRow/FlexRow";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import DocsSidebarSection from "../../components/Docs/DocsSidebarSection/DocsSidebarSection";
import DocsSidebarItem, {
  RequestType,
} from "../../components/Docs/DocsSidebarItem/DocsSidebarItem";

import { Routes, Route } from "react-router-dom";
import DocsWelcome from "./DocsWelcome/DocsWelcome";

interface DocsProps {}

const Docs: FC<DocsProps> = () => {
  useEffect(() => {
    document.title = "Api Docs";
  }, []);

  return (
    <div className={styles.Docs} data-testid="Docs">
      <div className={styles.DocsHeader}>test1</div>
      <div className={styles.DocsBody}>
        <FlexRow>
          <div className={styles.DocsSidebar}>
            <FlexColumn>
              <DocsSidebarSection label="Welcome" route="/docs/welcome">
                <DocsSidebarItem label="introduction" />
                <DocsSidebarItem
                  requestType={RequestType.GET}
                  label="/api/user"
                />
                <DocsSidebarItem
                  requestType={RequestType.POST}
                  label="a"
                  route="#a"
                />
                <DocsSidebarItem
                  requestType={RequestType.PUT}
                  label="b"
                  route="#b"
                />
              </DocsSidebarSection>
            </FlexColumn>
          </div>
          <div className={styles.DocsContent}>
            {/* DOCS CONTENT (IN PAGE FORM) */}
            <Routes>
              <Route path="/*" element={<DocsWelcome />} />
              <Route path="/welcome" element={<DocsWelcome />} />
            </Routes>
          </div>
        </FlexRow>
      </div>
    </div>
  );
};
export default Docs;
