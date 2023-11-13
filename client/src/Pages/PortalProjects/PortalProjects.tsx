import React, { FC, useEffect, useState } from "react";

import styles from "./PortalProjects.module.scss";
import FlexRow from "../../layout/FlexRow/FlexRow";

import {
    getProjects,
    result_projects
} from "../../API/Projects";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

interface PortalProjectsProps {
    role?: string;
}

const PortalProjects: FC<PortalProjectsProps> = ({ role }: PortalProjectsProps) => {
    const [projects, setProjects] = useState<result_projects[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProjects(undefined, (data) => {
            setProjects(data);
            setLoading(false);
            console.log(projects);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

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
                                    : projects.map((p, i) => {
                                        return (
                                            <ProjectCard
                                                key={i}
                                                pname={p.project_name}
                                                plocation={p.project_location}
                                                relatedFields={p.related_fields}
                                                pdescription={p.project_description}
                                                numStudents={p.num_students}
                                                termLength={p.term_length}
                                                compensationHour={p.compensation_hour}
                                                startDate={p.start_date}
                                                desiredSkills={p.desired_skills}
                                                phosts={p.project_hosts}
                                                contactEmail={p.contact_email}
                                                deletable={true}
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