import React, { FC, useEffect, useState } from "react";
import {
  createForm,
  deleteForm,
  getForms,
  result_getForms,
} from "../../API/Form";
import ErrorText from "../../components/ErrorText/ErrorText";
import Form from "../../components/Form/Form";
import FormItem from "../../components/FormItem/FormItem";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import SuccessText from "../../components/SuccessText/SuccessText";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import { handleChange_input_string } from "../../Scripts/InputHandler";
import { compareUserRoles } from "../../Scripts/RoleManagement";
import styles from "./PortalForms.module.scss";

interface PortalFormsProps {
  role?: string;
}

const PortalForms: FC<PortalFormsProps> = ({ role }: PortalFormsProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formName, setFormName] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formURL, setFormURL] = useState("");

  //Submitting form with required inputs
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    //show the modal
    setShowCreateModal(true);
  };

  const handleCreateForm = async () => {
    setSuccess("");
    setError("");
    //attempt to create new form
    /**
     * Creates form on membership portal for DSGT members, displays error message if form is submitted with incomplete info
     * @param formName the title of the to-be-deployed form, e.g. "Application form"
     * @param formURL the link to the form
     * @param formTime how long the form will remain active in minutes, e.g. 60 mins
     */
    await createForm(formName, formURL, formTime, () => {
      setSuccess("Form Created");
      window.location.reload();
    }).catch((err) => {
      setError(err.message);
    //error message is displayed when new form can't be created
      console.error(err);
    });
  };

  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<result_getForms[]>();

  useEffect(() => {
    getForms(0, (data) => {
      // console.log(data);
      setForms(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setError(err);
    });
  }, []);

  const [error2, setError2] = useState("");

  const [currentFormId, setCurrentFormId] = useState(-1);
  const [currentFormName, setCurrentFormName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteForm = async () => {
    setError2("");
    //attempt to delete the form
    /**
     * Deletes previously created form, displays error message to console when appropriate
     * @param currentFormId id given to created form
     */
    await deleteForm(currentFormId, () => {
      window.location.reload();
    }).catch((err) => {
      console.error(err);
      setError2(err.message);
    });
  };

  //visual layout of Forms page on Membership portal along with prompted messages when user creates form
  return (
    <div className={styles.PortalForms} data-testid="PortalForms">
      <h1 className={styles.Major}>Forms</h1>
      {compareUserRoles(role || "guest", "moderator") >= 0 ? (
        <>
          <FlexRow gap="5em" wrap="wrap-reverse" align="flex-start">
            <Form onSubmit={handleSubmit} submitPlaceholder="Create">
              <h1 className={styles.Minor}>Create a Form</h1>
              <InputField
                type="text"
                placeholder="Form Name"
                onChange={(e) => {
                  handleChange_input_string(e, setFormName);
                }}
                width="100%"
                required
                validIndication
              />
              <InputField
                type="text"
                placeholder="Estimated Time"
                helper={<InputHelper lines={["Example: 5min"]} />}
                width="100%"
                onChange={(e) => {
                  handleChange_input_string(e, setFormTime);
                }}
              />
              <InputField
                type="url"
                placeholder="Form Link"
                width="100%"
                onChange={(e) => {
                  handleChange_input_string(e, setFormURL);
                }}
                required
                validIndication
              />
              <ErrorText>{error}</ErrorText>
              <SuccessText>{success}</SuccessText>
            </Form>
            <div className={styles.SideBySide}>
              <FlexColumn gap="20px">
                <h1 className={styles.Minor}>
                  Here's what your form will look like to members:
                </h1>
                <FormItem
                  formName={formName}
                  formTime={formTime}
                  formLink={formURL}
                />
              </FlexColumn>
            </div>
          </FlexRow>
          <FlexColumn gap="20px">
            <h1 className={styles.Minor}>Manage Forms</h1>
            {error2 ? <ErrorText>{error2}</ErrorText> : ""}
            {loading
              ? "loading..."
              : forms && forms.length > 0
                ? forms.map((form, i) => (
                  <FormItem
                    formName={form.name}
                    formTime={form.time}
                    formLink={form.url}
                    key={form.form_id}
                    formID={form.form_id}
                    onDelete={() => {
                      setCurrentFormId(form.form_id);
                      setCurrentFormName(form.name);
                      setShowDeleteModal(true);
                    }}
                    deletable
                  />
                ))
                : "No forms found."}
          </FlexColumn>
          <Modal
            open={showCreateModal}
            setOpen={setShowCreateModal}
            preset={ModalPreset.Confirm}
            handleConfirmed={handleCreateForm}
          >
            Are you sure you would like to create this form?
          </Modal>
          <Modal
            open={showDeleteModal}
            setOpen={setShowDeleteModal}
            preset={ModalPreset.Confirm}
            handleConfirmed={handleDeleteForm}
          >
            Are you sure you would like to delete the form '{currentFormName}'?
          </Modal>
        </>
      ) : (
        ""
      )}
      <FlexColumn gap="20px" padding="20px 0">
        <h1 className={styles.Minor}>Complete Forms</h1>
        {loading
          ? "loading..."
          : forms && forms.length > 0
            ? forms.map((form, i) => (
              <FormItem
                formName={form.name}
                formTime={form.time}
                formLink={form.url}
                key={form.form_id}
              />
            ))
            : "No forms found."}
      </FlexColumn>
    </div>
  );
};

export default PortalForms;
