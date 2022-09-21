import React, { FC } from 'react';
import styles from './TeamCard.module.scss';

interface TeamCardProps {}

const TeamCard: FC<TeamCardProps> = () => (
  <div className={styles.TeamCard} data-testid="TeamCard">
    TeamCard Component
  </div>
);

export default TeamCard;
