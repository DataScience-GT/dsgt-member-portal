import React, { FC } from "react";
import styles from "./PortalTeams.module.scss";
import portal_styles from "../PortalPage.module.scss";
import { Route, Routes, useParams } from "react-router-dom";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import TeamCard from "../../components/TeamCard/TeamCard";
import InlineLink from "../../components/InlineLink/InlineLink";

interface PortalTeamsProps {}

const PortalTeams: FC<PortalTeamsProps> = () => {
  return (
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
              <FlexRow gap="1em" padding="1em 0 0 0">
                <TeamCard name="Tech Team" id={1} />
                <TeamCard name="Content Team" id={2} />
                <TeamCard name="Bootcamp In-Person" id={3} />
              </FlexRow>
            </FlexColumn>
          }
        />
        <Route path="/:team_id" element={<TeamPage />} />
      </Routes>
    </div>
  );
};

//the page to manage teams
const TeamPage: FC = () => {
  const { team_id } = useParams();
  return <div className={styles.TeamPage}>
    <InlineLink to="/portal/teams" margin="1em 0 0 0">Go Back</InlineLink>
  </div>;
};

export default PortalTeams;
