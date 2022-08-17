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
      <h1 className={styles.Minor}>Create a Form</h1>
      <FlexRow gap="20px" wrap="wrap-reverse" align="flex-start">
        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Form Name"
            onChange={(e) => {
              handleChange_input_string(e, setFormName);
            }}
            required
          />
          <InputField
            type="text"
            placeholder="Estimated Time"
            helper={<InputHelper lines={["Example: 5min"]} />}
            onChange={(e) => {
              handleChange_input_string(e, setFormTime);
            }}
          />
        </Form>
        <div className={styles.SideBySide}>
          <FlexColumn>
            <FormItem
              formName={formName}
              formTime={formTime}
              formLink={formURL}
            />
          </FlexColumn>
        </div>
      </FlexRow>
      <h1 className={styles.Minor}>Existing Forms</h1>
      <FlexColumn gap="10px">
        <FormItem
          formName="Leadership Application"
          formTime="5min"
          formLink="#"
        />
        <FormItem />
        <FormItem />
      </FlexColumn>
    </div>
  );
};

export default PortalForms;
