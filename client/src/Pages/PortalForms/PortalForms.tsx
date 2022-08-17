import React, { FC, useState } from "react";
import Form from "../../components/Form/Form";
import FormItem from "../../components/FormItem/FormItem";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import { handleChange_input_string } from "../../Scripts/InputHandler";
import styles from "./PortalForms.module.scss";

interface PortalFormsProps {}

const PortalForms: FC<PortalFormsProps> = () => {
  const [formName, setFormName] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formURL, setFormURL] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formName, formTime, formURL);
  };
  return (
    <div className={styles.PortalForms} data-testid="PortalForms">
      <h1 className={styles.Major}>Forms</h1>
      <FlexRow gap="5em" wrap="wrap-reverse" align="flex-start">
        <Form onSubmit={handleSubmit}>
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
        <h1 className={styles.Minor}>Existing Forms</h1>
        <FormItem
          formName="Leadership Application"
          formTime="5min"
          formLink="#"
          deletable
          onDelete={() => {
            console.log("delete");
          }}
        />
        <FormItem deletable />
        <FormItem deletable />
      </FlexColumn>
    </div>
  );
};

export default PortalForms;
