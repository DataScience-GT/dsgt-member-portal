import React, { FC, useEffect, useState } from "react";

import styles from "./PortalProjects.module.scss";
import FlexRow from "../../layout/FlexRow/FlexRow";

import {
    getProjects,
    result_getProjects
} from "../../API/Projects";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";

interface PortalProjectsProps {
    role?: string;
}

const PortalProjects: FC<PortalProjectsProps> = ({role}: PortalProjectsProps) => {
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

    return (
        <div className={styles.PortalProjects} data-testid="PortalProjects">
            <FlexRow spacing="space-between">
                <div className={styles.FlexLeft}>
                    <h1 className={styles.Major}>Research Postings</h1>
                    <h2 className={styles.Minor}>Apply to Active Research Projects</h2>
                    <FlexColumn padding="1em 0 0 0">
                        <h2 className={styles.Mini}>Existing Projects</h2>
                        <div className={styles.Cards}>
                        {/* {loading
                            ? "Loading..."
                            : projects.length <= 0
                            ? "No projects found."
                            : projects.map((e, i) => {
                                return (
                                <ProjectCard
                                    key={i}
                                    name={e.name}
                                    location={e.location}
                                    imageSRC={e.imageData}
                                    shortDescription={e.shortDescription}
                                    longDescription={e.longDescription}
                                    startDate={e.startDate}
                                    startTime={e.startTime}
                                    endDate={e.endDate}
                                    endTime={e.endTime}
                                    link={e.link}
                                    deletable
                                ></ProjectCard>
                                );
                            })} */}
                        </div>
                    </FlexColumn>
                </div>
            </FlexRow>
        </div>
    )
}
export default PortalProjects;