import React, { FC } from "react";
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
      {id ? <a href={`/portal/teams/${id}`} className={styles.Button}>Details</a> : ""}
    </FlexColumn>
  </div>
);

export default TeamCard;
