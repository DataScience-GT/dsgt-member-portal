import React, { FC } from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}

const InputField: FC<InputFieldProps> = ({
  type,
  placeholder,
}: InputFieldProps) => (
  <div className={styles.InputField} data-testid="InputField">
    <input
      id={"input-" + placeholder?.replaceAll(" ", "-")}
      type={type}
      placeholder=" "
      required
    />
    <label htmlFor={"input-" + placeholder}>{placeholder}</label>
  </div>
);

export default InputField;
