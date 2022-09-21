import React, { FC } from "react";
import { Link } from "react-router-dom";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./TeamCard.module.scss";

interface TeamCardProps {
  id?: number;
  name?: string;
}

const TeamCard: FC<TeamCardProps> = ({ id, name }: TeamCardProps) => (
  <div className={styles.TeamCard} data-testid="TeamCard">
    <FlexColumn gap="0.5em">
      <p className={styles.Name}>{name || "No Name"}</p>
      {id ? (
        <Link to={`/portal/teams/${id}`} className={styles.Button}>
          Details
        </Link>
      ) : (
        ""
      )}
    </FlexColumn>
  </div>
);

export default TeamCard;
