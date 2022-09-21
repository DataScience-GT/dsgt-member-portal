import React, { FC, useState } from "react";
import styles from "./PortalTeams.module.scss";
import portal_styles from "../PortalPage.module.scss";
import { Route, Routes, useParams } from "react-router-dom";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import TeamCard from "../../components/TeamCard/TeamCard";
import InlineLink from "../../components/InlineLink/InlineLink";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import { handleChange_input_string } from "../../Scripts/InputHandler";
import { compareUserRoles } from "../../Scripts/RoleManagement";

interface PortalTeamsProps {
  role?: string;
}

const PortalTeams: FC<PortalTeamsProps> = ({ role }) => {
  const [teamName, setTeamName] = useState("");
  const handleSubmit = () => {};

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
            <>
              {compareUserRoles(role || "guest", "administrator") >= 0 ? (
                <>
                  <FlexColumn>
                    <h2 className={portal_styles.Minor}>Your Teams</h2>
                    <FlexRow gap="1em" padding="1em 0">
                      <TeamCard name="Tech Team" />
                      <TeamCard name="Content Team" />
                      <TeamCard name="Bootcamp In-Person" />
                    </FlexRow>
                  </FlexColumn>
                  <FlexColumn>
                    <h2 className={portal_styles.Minor}>All Teams</h2>
                    <FlexRow gap="1em" padding="1em 0 0 0">
                      <TeamCard name="Tech Team" id={1} />
                      <TeamCard name="Content Team" id={2} />
                      <TeamCard name="Bootcamp In-Person" id={3} />
                    </FlexRow>
                  </FlexColumn>
                  <FlexColumn padding="1em 0 0 0" width="100%">
                    <h2 className={portal_styles.Minor}>Create Team</h2>
                    <FlexRow
                      gap="5em"
                      wrap="wrap-reverse"
                      align="flex-end"
                      width="100%"
                    >
                      <Form
                        onSubmit={handleSubmit}
                        submitPlaceholder="Create"
                        maxWidth="100%"
                      >
                        <InputField
                          type={"text"}
                          onChange={(e) => {
                            handleChange_input_string(e, setTeamName);
                          }}
                          placeholder="Team Name"
                          width="100%"
                          required
                          originalValue={teamName}
                        />
                      </Form>
                      <div className={styles.SideBySide}>
                        <FlexColumn gap="20px">
                          <h1 className={portal_styles.Minor}>
                            Here's what your team will look like to members:
                          </h1>
                          <TeamCard name={teamName} id={-1} />
                        </FlexColumn>
                      </div>
                    </FlexRow>
                  </FlexColumn>
                </>
              ) : (
                ""
              )}
            </>
          }
        />
        <Route path="/:team_id" element={<TeamPage />} />
      </Routes>
    </div>
  );
};

//the page to manage teams
interface TeamPageProps {
  role?: string;
}
const TeamPage: FC<TeamPageProps> = ({ role }) => {
  const { team_id } = useParams();
  return (
    <div className={styles.TeamPage}>
      {compareUserRoles(role || "guest", "administrator") >= 0 ? (
        <>
          <InlineLink to="/portal/teams" margin="1em 0 0 0">
            Go Back
          </InlineLink>
        </>
      ) : (
        <>
          <h2 className={portal_styles.Minor}>
            You do not have access to this page.
          </h2>
          <InlineLink to="/portal/teams" margin="1em 0 0 0">
            Go Back
          </InlineLink>
        </>
      )}
    </div>
  );
};

export default PortalTeams;
