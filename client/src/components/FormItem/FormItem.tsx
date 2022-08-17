import React, { FC } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./FormItem.module.scss";

interface FormItemProps {
  formName?: string;
  formTime?: string;
  formLink?: string;
}

const FormItem: FC<FormItemProps> = ({
  formName,
  formTime,
  formLink,
}: FormItemProps) => (
  <div className={styles.FormItem} data-testid="FormItem">
    <a href={formLink} target="_blank" rel="noreferrer">
      <FlexRow spacing="space-between" align="center" width="fit-content">
        <div className={styles.LabelBox}>
          <span className={styles.FormLabel}>Form</span>
        </div>
        <div className={styles.FormContent}>
          <span className={styles.FormName}>{formName || "form name"}</span>

          {formTime ? (
            <span
              className={styles.FormTime}
            >{`Estimated Time: ${formTime}`}</span>
          ) : (
            ""
          )}
        </div>

        <span className={styles.FormArrow}>→</span>
      </FlexRow>
    </a>
  </div>
);

export default FormItem;
