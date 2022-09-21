import React, { FC } from "react";
import styles from "./PortalTeams.module.scss";
import portal_styles from "../PortalPage.module.scss";
import { Route, Routes } from "react-router-dom";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import TeamCard from "../../components/TeamCard/TeamCard";

interface PortalTeamsProps {}

const PortalTeams: FC<PortalTeamsProps> = () => (
  <div
    className={`${styles.PortalTeams} ${portal_styles.PortalPage}`}
    data-testid="PortalTeams"
  >
    <h1 className={portal_styles.Major}>Teams</h1>
    <Routes>
      <Route
        path="/"
        element={
          <FlexColumn>
            <h2 className={styles.Minor}>All Teams</h2>
            <FlexRow>
              <TeamCard />
              <TeamCard />
              <TeamCard />
            </FlexRow>
          </FlexColumn>
        }
      />
      <Route path="/:id" element={<p>two</p>} />
    </Routes>
  </div>
);

export default PortalTeams;
