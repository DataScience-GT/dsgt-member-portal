import React, { FC, useEffect, useState } from "react";
import styles from "./PortalTeams.module.scss";
import portal_styles from "../PortalPage.module.scss";
import { Route, Routes, useParams } from "react-router-dom";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import TeamCard from "../../components/TeamCard/TeamCard";
import InlineLink from "../../components/InlineLink/InlineLink";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import {
  handleChange_input_string,
  handleChange_textarea_string,
} from "../../Scripts/InputHandler";
import { compareUserRoles } from "../../Scripts/RoleManagement";
import ScrollableList from "../../components/ScrollableList/ScrollableList";
import {
  addMembersToTeam,
  createTeam,
  getMyTeams,
  getTeamData,
  getTeams,
  result_getTeamData,
  result_getTeams,
} from "../../API/Teams";
import ErrorText from "../../components/ErrorText/ErrorText";
import SuccessText from "../../components/SuccessText/SuccessText";

interface PortalTeamsProps {
  role?: string;
}

const PortalTeams: FC<PortalTeamsProps> = ({ role }) => {
  const [teams, setTeams] = useState<result_getTeams[]>();
  const [myTeams, setMyTeams] = useState<result_getTeams[]>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!teamName) {
      setError("Missing required field: Team Name");
      return;
    }

    await createTeam(teamName, teamDescription, () => {
      setSuccess("Team Created!");
    }).catch((err) => setError(err.message));
  };

  useEffect(() => {
    getTeams((data) => {
      setTeams(data);
    });
    getMyTeams((data) => {
      setMyTeams(data);
    });
  }, []);

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
              <FlexColumn>
                <h2 className={portal_styles.Minor}>Your Teams</h2>
                <FlexRow gap="1em" padding="1em 0">
                  {myTeams && myTeams.length
                    ? myTeams?.map((t, i) => (
                        <TeamCard name={t.name} key={t.team_id} />
                      ))
                    : "No Teams."}
                </FlexRow>
              </FlexColumn>
              {compareUserRoles(role || "guest", "administrator") >= 0 ? (
                <>
                  <FlexColumn>
                    <h2 className={portal_styles.Minor}>All Teams</h2>
                    <FlexRow gap="1em" padding="1em 0 0 0">
                      {teams && teams.length
                        ? teams?.map((t, i) => (
                            <TeamCard
                              name={t.name}
                              id={t.team_id}
                              key={t.team_id}
                            />
                          ))
                        : ""}
                    </FlexRow>
                  </FlexColumn>
                  <FlexColumn padding="1em 0 0 0" width="100%">
                    <h2 className={portal_styles.Minor}>Create Team</h2>
                    <FlexRow
                      gap="1em"
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
                        <textarea
                          className={styles.DescriptionInput}
                          placeholder={"Description"}
                          onChange={(e) => {
                            handleChange_textarea_string(e, setTeamDescription);
                          }}
                        ></textarea>
                        <ErrorText>{error}</ErrorText>
                        <SuccessText>{success}</SuccessText>
                      </Form>
                      <div className={styles.SideBySide}>
                        <FlexColumn gap="20px">
                          <h1 className={portal_styles.Minor}>
                            Here's what your team looks like:
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
        <Route path="/:team_id" element={<TeamPage role={role} />} />
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
  const [teamData, setTeamData] = useState<result_getTeamData>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(false);

  const [emails, setEmails] = useState<Set<string>>();

  const handleChange_emails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.currentTarget.value;
    let s: Set<string> = new Set();
    let new_line = newValue.split("\n");
    let semicolon = newValue.split(";");
    let comma = newValue.split(",");
    let vals;
    if (new_line.length > semicolon.length && new_line.length > comma.length) {
      vals = new_line;
    } else if (
      semicolon.length > new_line.length &&
      semicolon.length > comma.length
    ) {
      vals = semicolon;
    } else {
      vals = comma;
    }

    vals.forEach((v) => {
      if (v && v.includes("@") && v.includes(".")) s.add(v.trim());
    });
    setEmails(s);
  };

  useEffect(() => {
    if (team_id)
      getTeamData(parseInt(team_id), (data) => {
        setTeamData(data);
      }).catch((err) => {
        setLoadError(err.message);
      });
  }, [team_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!emails) {
      setError("No emails entered");
      return;
    }
    if (!loading && team_id) {
      setLoading(true);
      addMembersToTeam(parseInt(team_id), Array.from(emails), (data) => {
        if (data.not_added && data.not_added.length) {
          setError(`Added all but: ${data.not_added.join(", ")}`);
        } else {
          setSuccess(
            `Added ${emails.size} member${emails.size > 1 ? "s" : ""}`
          );
        }
        setLoading(false);
      }).catch((err) => setError(err.message));
    }
  };

  return (
    <div className={styles.TeamPage}>
      <InlineLink to="/portal/teams" margin="1em 0 0 0">
        Go Back
      </InlineLink>
      {compareUserRoles(role || "guest", "administrator") >= 0 ? (
        <FlexColumn gap="1em" padding="1em 0 0 0">
          {!loadError ? (
            <>
              <h2 className={portal_styles.Minor}>Add users to team</h2>
              <Form width="fit-content" onSubmit={handleSubmit}>
                <FlexRow gap="1em">
                  <textarea
                    className={styles.TextInput}
                    onChange={handleChange_emails}
                    placeholder="Emails"
                  ></textarea>

                  <>
                    <ScrollableList
                      height="15em"
                      minWidth="15em"
                      width="fit-content"
                      values={emails ? Array.from(emails) : []}
                    />
                  </>
                </FlexRow>
                <SuccessText>{success}</SuccessText>
                <ErrorText>{error}</ErrorText>
              </Form>
              <h2 className={portal_styles.Minor}>Members on the team</h2>
              <ScrollableList
                height="15em"
                minWidth="15em"
                width="fit-content"
                values={
                  teamData
                    ? teamData.member_list.map((d) => d.fname + " " + d.lname)
                    : []
                }
              />
            </>
          ) : (
            <ErrorText>{loadError}</ErrorText>
          )}
        </FlexColumn>
      ) : (
        <>
          <h2 className={portal_styles.Minor}>
            You do not have access to this page.
          </h2>
        </>
      )}
    </div>
  );
};

export default PortalTeams;
