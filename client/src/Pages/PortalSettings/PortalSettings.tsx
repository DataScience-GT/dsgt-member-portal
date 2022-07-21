import React, { FC } from "react";
import styles from "./PortalSettings.module.scss";

interface PortalSettingsProps {}

const PortalSettings: FC<PortalSettingsProps> = () => {
  //setup handlers and state for each input field
  return (
    <div className={styles.PortalSettings} data-testid="PortalSettings">
      PortalSettings Component
    </div>
  );
};

export default PortalSettings;
