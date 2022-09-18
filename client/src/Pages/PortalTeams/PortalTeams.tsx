import React, { FC } from 'react';
import styles from './PortalTeams.module.scss';
import portal_styles from "../PortalPage.module.scss";

interface PortalTeamsProps {}

const PortalTeams: FC<PortalTeamsProps> = () => (
  <div className={`${styles.PortalTeams} ${portal_styles.PortalPage}`} data-testid="PortalTeams">
    <h1 className={portal_styles.Major}>Teams</h1>
  </div>
);

export default PortalTeams;
