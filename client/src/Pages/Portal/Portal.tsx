import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import FlexRow from "../../layout/FlexRow/FlexRow";
import PortalSettings from "../PortalSettings/PortalSettings";
import styles from "./Portal.module.scss";

interface PortalProps {}

const Portal: FC<PortalProps> = () => {
  return (
    <div className={styles.Portal} data-testid="Portal">
      <FlexRow height="100vh">
        <Sidebar />
        <div className={styles.PortalBody}>
          <Routes>
            <Route path="/settings" element={<PortalSettings />} />
          </Routes>
        </div>
      </FlexRow>
    </div>
  );
};

export default Portal;
