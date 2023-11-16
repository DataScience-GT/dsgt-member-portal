import React, { FC } from "react";
import styles from "./ProjectCard.module.scss";
import trash_icon from "../../assets/icons/trash.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import InputField from "../InputField/InputField";
import FlexRow from "../../layout/FlexRow/FlexRow";

interface ProjectCardProps {
    // The name of the project
    pname: string;
    // The project location
    plocation: string;
    // The related fields associated with the project
    relatedFields?: string;
    // The project description
    pdescription?: string;
    // The number of students wanted
    numStudents?: string;
    // The length of the project term
    termLength?: string;
    // The hourly compensation
    compensationHour?: number;
    // The project start date
    startDate?: string;
    // The desired skills associated with the project
    desiredSkills?: string;
    // The project hosts
    phosts?: string;
    // The professor contact email
    contactEmail?: string;
    // Deletable aspect of the project
    deletable?: boolean;
    onDelete?: (project_id: number) => void;
    role?: string;
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
    deletable,
    onDelete,
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
            <div className={styles.ProjectCardInfo}>
                <FlexColumn padding="1em" gap="0.5em">
                    <h1 className={styles.Major}>{pname}</h1>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Start date</span> 
                        {startDate}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Description</span> 
                        {pdescription}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Length of project</span> 
                        {termLength}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Hourly compensation</span> 
                        {compensationHour}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Location</span> 
                        {plocation}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Number of openings</span> 
                        {numStudents}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Related fields</span> 
                        {relatedFields}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Desired skills</span> 
                        {desiredSkills}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Project hosts</span> 
                        {phosts}
                    </p>
                    <p className={styles.ProjectInfo}> 
                        <span className={styles.Span}>Contact email</span> 
                        {contactEmail}
                    </p>
                </FlexColumn>
            </div>
            <div className={styles.ProjectCardApp}>
                <div className={styles.Submit}>
                    <InputField type={"submit"} placeholder="Apply" width="auto" />
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;