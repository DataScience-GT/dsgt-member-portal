import React, { FC } from "react";
import styles from "./ProjectCard.module.scss";
import trash_icon from "../../assets/icons/trash.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import InputField from "../InputField/InputField";
import FlexRow from "../../layout/FlexRow/FlexRow";

interface ProjectCardProps {
    pid: number | undefined;
    pname: string | undefined;
    plocation: string | undefined;
    relatedFields?: string;
    pdescription?: string;
    numStudents?: string;
    termLength?: string;
    compensationHour?: number;
    startDate?: string;
    desiredSkills?: string;
    phosts?: string;
    contactEmail?: string;
    deletable?: boolean;
    applyable?: boolean;
    role?: string;
    onDelete?: (project_id: number) => void;
    onApply?: (project_id: number) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
    pid,
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
    applyable,
    onDelete,
    onApply,
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
                     <h3 className={styles.Major}>{pname}</h3>
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
             {applyable ? (
                 <div className={styles.ProjectCardApp}>
                     <div className={styles.Submit}>
                         <InputField type="submit" placeholder="Apply" width="auto" 
                             onClick={() => {
                                 if (pid && onApply) {
                                     onApply(pid);
                                 }
                             }} 
                         />
                     </div>
                 </div>
             ) : (
                 ""
             )}
         </div>
     )
 }

export default ProjectCard;