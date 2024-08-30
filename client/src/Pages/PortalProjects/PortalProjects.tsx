import { FC, useEffect, useState } from "react";

import styles from "./PortalProjects.module.scss";
import FlexRow from "../../layout/FlexRow/FlexRow";

import {
    deleteProject,
    getProjects,
    Project
} from "../../API/Projects";
import { getProjectApps, ProjectApp, submitProjectApplication } from "../../API/ProjectApps";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import InputField from "../../components/InputField/InputField";
import { compareUserRoles } from "../../Scripts/RoleManagement";

interface PortalProjectsProps {
    role?: string;
}

const PortalProjects: FC<PortalProjectsProps> = ({ role }: PortalProjectsProps) => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectApps, setProjectApps] = useState<ProjectApp[]>([]);
    const [projectsFromApps, setProjectsFromApps] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingApps, setLoadingApps] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState(-1);
    const [selectedProject, setSelectedProject] = useState<Project>();
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [technicalSkills, setTechnicalSkills] = useState("");
    const [motivation, setMotivation] = useState("");
    const [teamFit, setTeamFit] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [linkedin, setLinkedIn] = useState("");
    const [resume, setResume] = useState("");
    const [availability, setAvailability] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getProjects(undefined, (data) => {
            setProjects(data);
            console.log(data);
            setLoading(false);
        }).catch((err) => {
            console.error(err);
        });
        getProjectApps(undefined, (apps) => {
            setProjectApps(apps);
            setLoadingApps(false);
        }, (projectsFromApps) => {
            setProjectsFromApps(projectsFromApps);
        }).catch((err) => {
            console.error(err);
        });
        const currProject = projects.find(project => project.project_inc === selectedProjectId);
        if (currProject) {
            setSelectedProject(currProject);
        }
    }, [selectedProjectId]);

    const handleApplyModalConfirm = async () => {
        setSuccess("");
        setError("");
        await submitProjectApplication(
            selectedProjectId,
            phoneNum,
            email,
            linkedin,
            resume,
            technicalSkills,
            motivation,
            teamFit,
            availability,
            () => {
                setSuccess(`Successully submitted an application to ${selectedProject?.project_name}!`);
            },
            (error: string) => {
                setError(`There was an issue: ${error}.`);
            }
        )
    };

    const handleDeleteModalConfirm = async () => {
        setSuccess("");
        setError("");
        await deleteProject(
            selectedProjectId,
            () => {
                setSuccess(`Successully deleted the project ${selectedProject?.project_name}!`);
                setSelectedProjectId(-1);
            }
        )
    };

    return (
        <div className={styles.PortalProjects} data-testid="PortalProjects">
            <Modal
                open={showApplyModal}
                setOpen={setShowApplyModal}
                preset={ModalPreset.Confirm}
                handleConfirmed={handleApplyModalConfirm}
                opacity="0.9"
            >
                <p className={styles.Text}>Fill out the form to submit an application for the following research project:</p>
                <FlexRow gap="1em" height="400px">
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
                        imgData={selectedProject?.image_data}
                        contactEmail={selectedProject?.contact_email}
                        deletable={false}
                        applyable={false}
                    ></ProjectCard>
                    <FlexColumn gap="1em">
                        <InputField
                            type={"text"}
                            name="phone"
                            placeholder="Preferred phone #"
                            onChange={(e) => {
                                setPhoneNum(e.currentTarget.value);
                            }}
                            bgcolor="#fff"
                            color="#000"
                            fontweight="400"
                        />
                        <InputField
                            type={"text"}
                            name="email"
                            placeholder="Preferred email"
                            onChange={(e) => {
                                setEmail(e.currentTarget.value);
                            }}
                            bgcolor="#fff"
                            color="#000"
                            fontweight="400"
                        />
                        <InputField
                            type={"text"}
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            onChange={(e) => {
                                setLinkedIn(e.currentTarget.value);
                            }}
                            bgcolor="#fff"
                            color="#000"
                            fontweight="400"
                        />
                        <InputField
                            type={"text"}
                            name="resume"
                            placeholder="Resume link (drive, dropbox)"
                            onChange={(e) => {
                                setResume(e.currentTarget.value);
                            }}
                            bgcolor="#fff"
                            color="#000"
                            fontweight="400"
                        />
                    </FlexColumn>
                    <FlexColumn width="400px">
                        <p className={styles.SAQ}>What are your technical skills? (e.g. Numpy, Sklearn). 100-200 words.</p>
                        <textarea
                            className={styles.TextBox}
                            placeholder="Enter your technical skils..."
                            onChange={(e) => {
                                setTechnicalSkills(e.currentTarget.value);
                            }}
                        ></textarea>
                        <p className={styles.SAQ}>What are your motivations in applying to this specific project? 100-200 words.</p>
                        <textarea
                            className={styles.TextBox}
                            placeholder="Enter your motivations..."
                            onChange={(e) => {
                                setMotivation(e.currentTarget.value);
                            }}
                        ></textarea>
                        <p className={styles.SAQ}>What makes you a good team player? 50-100 words.</p>
                        <textarea
                            className={styles.TextBox}
                            placeholder="Enter your team abilities..."
                            onChange={(e) => {
                                setTeamFit(e.currentTarget.value);
                            }}
                        ></textarea>
                        <p className={styles.SAQ}>How soon are you available to interview? Enter a date and time (e.g. 10/2, 10:00am)</p>
                        <textarea
                            className={styles.TextBox}
                            placeholder="Enter your availability..."
                            onChange={(e) => {
                                setAvailability(e.currentTarget.value);
                            }}
                        ></textarea>
                    </FlexColumn>
                </FlexRow>
            </Modal>
            <Modal
                open={showDeleteModal}
                setOpen={setShowDeleteModal}
                preset={ModalPreset.Confirm}
                handleConfirmed={handleDeleteModalConfirm}
                opacity="0.9"
            >
                <p className={styles.Text}>Are you sure you would like to delete the following project?</p>
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
                    imgData={selectedProject?.image_data}
                    contactEmail={selectedProject?.contact_email}
                    deletable={false}
                    applyable={false}
                ></ProjectCard>
            </Modal>
            <FlexRow spacing="space-between">
                <div className={styles.FlexLeft}>
                    <h1 className={styles.Major}>Research Postings</h1>
                    <h2 className={styles.Minor}>Apply to Active Research Projects</h2>
                    <p className={styles.Success}>{success}</p>
                    <p className={styles.Error}>{error}</p>
                    <FlexColumn padding="1em 0 0 0">
                        <h2 className={styles.Mini}>Projects You've Applied To</h2>
                        <div className={styles.MyProjects}>
                            <div className={styles.ApplyCards}>
                                {loadingApps 
                                    ? "Loading..."
                                    : projectApps.length <= 0
                                        ?  "No project apps found."
                                        :   projectApps.map((a, i) => {
                                            const relProject = projectsFromApps
                                                .find(project => project.project_inc === a.project_id);
                                            return (
                                                <ProjectCard
                                                    key={i}
                                                    pid={relProject?.project_inc}
                                                    pname={relProject?.project_name}
                                                    plocation={relProject?.project_location}
                                                    relatedFields={relProject?.related_fields}
                                                    pdescription={relProject?.project_description}
                                                    numStudents={relProject?.num_students}
                                                    termLength={relProject?.term_length}
                                                    compensationHour={relProject?.compensation_hour}
                                                    startDate={relProject?.start_date}
                                                    desiredSkills={relProject?.desired_skills}
                                                    phosts={relProject?.project_hosts}
                                                    imgData={relProject?.image_data}
                                                    contactEmail={relProject?.contact_email}
                                                    deletable={false}
                                                    applyable={false}
                                                ></ProjectCard>
                                            );
                                        })}
                            </div>
                        </div>
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
                                                imgData={p.image_data}
                                                contactEmail={p.contact_email}
                                                deletable={compareUserRoles(role || "guest", "professor") >= 0}
                                                applyable={true}
                                                onDelete={(project_id?: number) => {
                                                    setShowDeleteModal(true);
                                                    if (project_id) {
                                                        setSelectedProjectId(project_id);
                                                    }
                                                }}
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