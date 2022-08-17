import React, { FC } from "react";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import InputField from "../InputField/InputField";
import styles from "./Form.module.scss";

interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  submitPlaceholder?: string;
  width?: string;
  maxWidth?: string;
  children?: React.ReactNode;
}

const Form: FC<FormProps> = ({
  onSubmit,
  children,
  submitPlaceholder,
  width,
  maxWidth,
}: FormProps) => (
  <div
    className={styles.Form}
    data-testid="Form"
    style={{ width: width || "300px", maxWidth: maxWidth || "100%" }}
  >
    <form onSubmit={onSubmit}>
      <FlexColumn gap="10px">
        {children}
        <FlexRow spacing="flex-end" width="100%">
          <InputField
            type="submit"
            placeholder={submitPlaceholder}
            width="auto"
          />
        </FlexRow>
      </FlexColumn>
    </form>
  </div>
);

export default Form;
