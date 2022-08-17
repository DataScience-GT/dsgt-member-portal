import React, { FC } from "react";
import FormItem from "../../components/FormItem/FormItem";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import styles from "./PortalForms.module.scss";

interface PortalFormsProps {}

const PortalForms: FC<PortalFormsProps> = () => (
  <div className={styles.PortalForms} data-testid="PortalForms">
    <h1 className={styles.Major}>Forms</h1>
    <h1 className={styles.Minor}>Available Forms</h1>
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

export default PortalForms;
