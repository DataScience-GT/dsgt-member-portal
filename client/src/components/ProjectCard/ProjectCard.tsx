import React, { FC } from "react";
import styles from "./ProjectCard.module.scss";
import trash_icon from "../../assets/icons/trash.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import InputField from "../InputField/InputField";

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
                <div className={styles.TrashContainer}>
                    <img className={styles.Trash} src={trash_icon} alt="click to delete" />
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
                    <p>Contact email: {contactEmail}</p>
                </FlexColumn>
            </div>
            <div className={styles.Submit}>
                <InputField type={"submit"} placeholder="Apply" width="auto" />
            </div>
        </div>
    )
}

export default ProjectCard;