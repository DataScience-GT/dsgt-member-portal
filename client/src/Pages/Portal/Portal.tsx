import React, { FC } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Portal.module.scss";

interface PortalProps {}

const Portal: FC<PortalProps> = () => {
  return (
    <div className={styles.Portal} data-testid="Portal">
      <FlexRow height="100vh">
        <Sidebar />
      </FlexRow>
    </div>
  );
};

export default Portal;
