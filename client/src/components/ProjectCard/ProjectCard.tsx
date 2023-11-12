import React, { FC } from "react";
import styles from "./ProjectCard.module.scss";
import trash_icon from "../../assets/icons/trash.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";

interface ProjectCardProps {
    pname: string;
    plocation: string;
    relatedFields: string;
    pdescription: string;
    numStudents: string;
    termLength: string;
    compensationHour: number;
    startDate: string;
    desiredSkills: string;
    phosts: boolean;
    contactEmail: string;
    deletable?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
    pname,
    plocation,
    relatedFields,
    pdescription,
    numStudents,
    termLength,
    compensationHour,
    startDate,
    desiredSkills,
    phosts,
    contactEmail,
    deletable
}: ProjectCardProps) => {
    return (
        <div className={styles.ProjectCard} data-testid="ProjectCard">
            {deletable ? (
                <div className={styles.DeleteButton}>
                    <img src={trash_icon} alt="click to delete" />
                </div>
            ) : (
                ""
            )}
            <div className={`${styles.Content} ${styles.InfoBox}`}>
                <FlexColumn>
                    <h1 className={styles.Major}>{pname}</h1>
                    <p className={styles.ProjectInfo}>Location: {plocation}</p>
                    <p className={styles.ProjectInfo}>Related fields: {relatedFields}</p>
                    <p className={styles.ProjectInfo}>Description: {pdescription}</p>
                    <p className={styles.ProjectInfo}>Number of openings: {numStudents}</p>
                    <p className={styles.ProjectInfo}>Term length: {termLength}</p>
                    <p className={styles.ProjectInfo}>Hourly compensation: {compensationHour}</p>
                    <p className={styles.ProjectInfo}> Start date: {startDate}</p>
                    <p className={styles.ProjectInfo}>Desired skills: {desiredSkills}</p>
                    <p className={styles.ProjectInfo}>Hosts: {phosts}</p>
                    <a href="https://poloclub.github.io/" className={styles.Apply}>Apply here!</a>
                </FlexColumn>
            </div>
        </div>
    )
}

export default ProjectCard;