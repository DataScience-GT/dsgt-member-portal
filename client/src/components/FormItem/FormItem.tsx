import React, { FC } from "react";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./FormItem.module.scss";

import trash_icon from "../../assets/icons/trash.svg";

interface FormItemProps {
  formName?: string;
  formTime?: string;
  formLink?: string;
  formID?: number | string;
  deletable?: boolean;
  onDelete?: () => void;
}

const FormItem: FC<FormItemProps> = ({
  formName,
  formTime,
  formLink,
  formID,
  deletable,
  onDelete,
}: FormItemProps) => {
  let inside = (
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

      {!deletable ? (
        <span className={styles.FormArrow}>→</span>
      ) : (
        <img
          className={styles.Trash}
          src={trash_icon}
          alt="click to delete"
          onClick={onDelete}
        />
      )}
    </FlexRow>
  );
  return (
    <div
      className={`${styles.FormItem} ${deletable ? styles.Deletable : ""}`}
      data-testid="FormItem"
      data-form-id={formID}
    >
      {!deletable ? (
        <a
          href={formLink ? formLink : "https://example.com"}
          target="_blank"
          rel="noreferrer"
        >
          {inside}
        </a>
      ) : (
        inside
      )}
    </div>
  );
};

export default FormItem;
