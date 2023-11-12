import React, { FC, useEffect, useState } from "react";

import styles from "./PortalProjects.module.scss";
import FlexRow from "../../layout/FlexRow/FlexRow";

import {
    getProjects,
    result_getProjects
} from "../../API/Projects";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

interface PortalProjectsProps {
    role?: string;
}

const PortalProjects: FC<PortalProjectsProps> = ({ role }: PortalProjectsProps) => {
    const [projects, setProjects] = useState<result_getProjects[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllProjects = async () => {
            await getProjects(undefined, (result: result_getProjects[]) => {
                setLoading(false);
                setProjects(result);
            }).catch(console.error);
        }
        getAllProjects();
    });

    //success/failure no projects to fetch-failure
    const dummyProject: result_getProjects = {
        pid: 12,
        pname: "Dummy Project",
        plocation: "Test Location",
        relatedFields: "Test Fields",
        pdescription: "......",
        numStudents: "1",
        termLength: "3 months",
        compensationHour: 15,
        startDate: "2023-01-01",
        desiredSkills: "Test Skills",
        phosts: true,
        contactEmail: "test@example.com",
    };

    const updatedProjects = [dummyProject, dummyProject, dummyProject, dummyProject, dummyProject, dummyProject, ...projects];

    //Form Link to a google form for applying to project
    //Make own form(look at one for making the account)
    //Have an accordion menu
    //Filter based on research area, or specific keywords
    //Modify from Register to create form
    //Ask Vicente about what form to use, filtering, questions professors want to chose, how information will be stored
    //Professor sees how many applicants apply to projects

    //Implementing drop down menu component for each project
    //Apply button/form
    //Filtering/saving projects 

    return (
        <div className={styles.PortalProjects} data-testid="PortalProjects">
            <FlexRow spacing="space-between">
                <div className={styles.FlexLeft}>
                    <h1 className={styles.Major}>Research Postings</h1>
                    <h2 className={styles.Minor}>Apply to Active Research Projects</h2>
                    <FlexColumn padding="1em 0 0 0">
                        <h2 className={styles.Mini}>Existing Projects</h2>
                        <div className={styles.Cards}>
                            {loading
                                ? "Loading..."
                                : projects.length <= 0
                                    ? "No projects found."
                                    : projects.map((e, i) => {
                                        return (
                                            <ProjectCard
                                                key={i}
                                                pname={e.pname}
                                                plocation={e.plocation}
                                                relatedFields={e.relatedFields}
                                                pdescription={e.pdescription}
                                                numStudents={e.numStudents}
                                                termLength={e.termLength}
                                                compensationHour={e.compensationHour}
                                                startDate={e.startDate}
                                                desiredSkills={e.desiredSkills}
                                                phosts={e.phosts}
                                                contactEmail={e.contactEmail}
                                            ></ProjectCard>
                                        );
                                    })}
                        </div>
                    </FlexColumn>
                </div>
            </FlexRow>
        </div>
    )
}
export default PortalProjects;