import React, { FC, useEffect, useState } from "react";

import styles from "./PortalProjects.module.scss";
import FlexRow from "../../layout/FlexRow/FlexRow";

import {
    getProjects,
    result_projects
} from "../../API/Projects";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import InputField from "../../components/InputField/InputField";

interface PortalProjectsProps {
    role?: string;
}

const PortalProjects: FC<PortalProjectsProps> = ({ role }: PortalProjectsProps) => {

    const [projects, setProjects] = useState<result_projects[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState(-1);
    const [selectedProject, setSelectedProject] = useState<result_projects>();
    const [showApplyModal, setShowApplyModal] = useState(false);

    const [saq1, setSaq1] = useState("");
    const [saq2, setSaq2] = useState("");
    const [saq3, setSaq3] = useState("");
    const [phoneNum, setPhoneNum] = useState(-1);

    useEffect(() => {
        getProjects(undefined, (data) => {
            setProjects(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
        const projectWithCurrentId = projects.find(project => project.project_inc === selectedProjectId);
        if (projectWithCurrentId) {
            setSelectedProject(projectWithCurrentId);
        }
    }, [selectedProjectId]);

    const handleApplyModalConfirm = async () => {

    };

    return (
        <div className={styles.PortalProjects} data-testid="PortalProjects">
            <Modal
                open={showApplyModal}
                setOpen={setShowApplyModal}
                preset={ModalPreset.Confirm}
                handleConfirmed={handleApplyModalConfirm}
            >
                Please fill out the form to submit an application for the following Project:
                <FlexRow>
                    <ProjectCard
                        pid={selectedProject?.project_inc}
                        pname={selectedProject?.project_name}
                        plocation={selectedProject?.project_location}
                        relatedFields={selectedProject?.related_fields}
                        pdescription={selectedProject?.project_description}
                        numStudents={selectedProject?.num_students}
                        termLength={selectedProject?.term_length}
                        compensationHour={selectedProject?.compensation_hour}
                        startDate={selectedProject?.start_date}
                        desiredSkills={selectedProject?.desired_skills}
                        phosts={selectedProject?.project_hosts}
                        contactEmail={selectedProject?.contact_email}
                        deletable={false}
                        applyable={false}
                    ></ProjectCard>
                    <FlexColumn>
                        <InputField
                            type={"SAQ1"}
                            name="phone"
                            placeholder="Phone number"
                            onChange={(e) => {
                                setPhoneNum(parseInt(e.currentTarget.value));
                            }}
                        />
                        <p className={styles.Question}>What are your primary technical skills? </p>
                        <InputField
                            type={"text"}
                            name="saq1"
                            placeholder="Enter here"
                            onChange={(e) => {
                                setSaq1(e.currentTarget.value);
                            }}
                        />

                        <p className={styles.Question}>How much time can you commit per week to this project?</p>
                        <InputField
                            type={"text"}
                            name="saq2"
                            placeholder="Enter here"
                            onChange={(e) => {
                                setSaq2(e.currentTarget.value);
                            }}
                        />

                        <p className={styles.Question}>What do you hope to gain out of this project?</p>
                        <InputField
                            type={"text"}
                            name="saq3"
                            placeholder="Enter here"
                            onChange={(e) => {
                                setSaq3(e.currentTarget.value);
                            }}
                        />
                    </FlexColumn>
                </FlexRow>
            </Modal>
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
                                                pid={p.project_inc}
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
                                                deletable={false}
                                                applyable={true}
                                                onApply={(project_id?: number) => {
                                                    setShowApplyModal(true);
                                                    if (project_id) {
                                                        setSelectedProjectId(project_id);
                                                    }
                                                }}
                                            ></ProjectCard>
                                        );
                                    })
                            }
                        </div>
                    </FlexColumn>
                </div>
            </FlexRow>
        </div>
    )
}
export default PortalProjects;