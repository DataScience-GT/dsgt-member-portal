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
import DocsApi from "./DocsApi/DocsApi";

interface DocsProps {}

const Docs: FC<DocsProps> = () => {
  useEffect(() => {
    document.title = "Api Docs";
  }, []);

  return (
    <div className={styles.Docs} data-testid="Docs">
      <div className={styles.DocsHeader}>DSGT Member Portal API</div>
      <div className={styles.DocsBody}>
        <FlexRow>
          <div className={styles.DocsSidebar}>
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
            </FlexColumn>
          </div>
          <div className={styles.DocsContent}>
            {/* DOCS CONTENT (IN PAGE FORM) */}
            <Routes>
              <Route path="/*" element={<DocsWelcome />} />
              <Route path="/welcome" element={<DocsWelcome />} />
              <Route path="/api" element={<DocsApi />} />
            </Routes>
          </div>
        </FlexRow>
      </div>
    </div>
  );
};
export default Docs;
