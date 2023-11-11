import React, { FC } from "react";
import styles from "./ProjectCard.module.scss";
import trash_icon from "../../assets/icons/trash.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";

interface ProjectCardProps {
    // The name of the project
    pname: string;
    // The project location
    plocation: string;
    // The related fields associated with the project
    relatedFields: string;
    // The project description
    pdescription: string;
    // The number of students wanted
    numStudents: string;
    // The length of the project term
    termLength: string;
    // The hourly compensation
    compensationHour: number;
    // The project start date
    startDate: string;
    // The desired skills associated with the project
    desiredSkills: string;
    // The project hosts
    phosts: boolean;
    // The professor contact email
    contactEmail: string;
    // Deletable aspect of the project
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
            <div className={styles.Content}>
                <FlexColumn>
                    <h1 className={styles.Major}>{pname}</h1>
                    <p>Location: {plocation}</p>
                    <p>Related fields: {relatedFields}</p>
                    <p>Description: {pdescription}</p>
                    <p>Number of openings: {numStudents}</p>
                    <p>Term length: {termLength}</p>
                    <p>Hourly compensation: {compensationHour}</p>
                    <p>Start date: {startDate}</p>
                    <p>Desired skills: {desiredSkills}</p>
                    <p>Hosts: {phosts}</p>
                    <p>Contact Email: {contactEmail}</p>
                </FlexColumn>
            </div>
        </div>
    )
}

export default ProjectCard;