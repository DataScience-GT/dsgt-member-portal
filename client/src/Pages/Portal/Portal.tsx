import React, { FC, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import FlexRow from "../../layout/FlexRow/FlexRow";
import PortalHome from "../PortalHome/PortalHome";
import PortalSettings from "../PortalSettings/PortalSettings";
import styles from "./Portal.module.scss";

import { Theme, ThemeContext } from "../../Context/ThemeContext";
import PortalMembers from "../PortalMembers/PortalMembers";
import { getRoleValue } from "../../Scripts/RoleManagement";

interface PortalProps {
  role?: string;
}

const Portal: FC<PortalProps> = ({ role }: PortalProps) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={`${styles.Portal} ${styles[theme]}`} data-testid="Portal">
      <FlexRow height="100vh">
        <Sidebar role={role} />
        <div className={styles.PortalBody}>
          <Routes>
            <Route path="/*" element={<PortalHome />} />
            <Route path="/settings" element={<PortalSettings />} />
            {role && getRoleValue(role) >= 6 ? (
              <Route path="/members" element={<PortalMembers />} />
            ) : (
              ""
            )}
          </Routes>
        </div>
      </FlexRow>
    </div>
  );
};

export default Portal;
