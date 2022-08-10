import React, { FC } from "react";
import styles from "./InputLabel.module.scss";

interface InputLabelProps {
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
}

const InputLabel: FC<InputLabelProps> = ({
  htmlFor,
  children,
  required,
}: InputLabelProps) => (
  <label
    className={styles.InputLabel}
    htmlFor={htmlFor}
    data-testid="InputLabel"
  >
    {children}
    {required ? <span className={styles.Required}>*</span> : ""}
  </label>
);

export default InputLabel;
