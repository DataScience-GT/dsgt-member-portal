import React, { FC, useEffect } from "react";
import styles from "./Docs.module.scss";

import FlexRow from "../../layout/FlexRow/FlexRow";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import DocsSidebarSection from "../../components/DocsSidebarSection/DocsSidebarSection";
import DocsSidebarItem, {
  RequestType,
} from "../../components/DocsSidebarItem/DocsSidebarItem";

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
              <DocsSidebarSection label="Welcome">
                <DocsSidebarItem />
                <DocsSidebarItem requestType={RequestType.GET} />
                <DocsSidebarItem requestType={RequestType.POST} />
                <DocsSidebarItem requestType={RequestType.PUT} />
              </DocsSidebarSection>
            </FlexColumn>
          </div>
          <div className={styles.DocsContent}>content</div>
        </FlexRow>
      </div>
    </div>
  );
};
export default Docs;
