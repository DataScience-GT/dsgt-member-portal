import React, { FC, useState } from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.KeyboardEventHandler<HTMLInputElement>;
  pattern?: string;
  helper?: React.ReactNode;
  validIndication?: boolean;
  originalValue?: string;
}

const InputField: FC<InputFieldProps> = ({
  type,
  placeholder,
  width,
  onClick,
  onChange,
  pattern,
  helper,
  validIndication,
  originalValue,
}: InputFieldProps) => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  if (type === "submit") {
    return (
      <div
        className={styles.InputFieldSubmit}
        data-testid="InputField"
        style={{ width: width || "300px" }}
      >
        <input
          id={"input-" + placeholder?.replaceAll(" ", "-")}
          type="submit"
          onClick={onClick}
          name={placeholder || "Submit"}
          value={placeholder || "Submit"}
        />
      </div>
    );
  } else if (type === "password") {
    const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      let checked = e.target.checked;
      setPasswordOpen(checked);
    };

    return (
      <div
        className={`${styles.InputField} ${styles.PasswordInputField}`}
        data-testid="InputField"
        style={{ width: width || "300px" }}
      >
        <input
          id={"input-" + placeholder?.replaceAll(" ", "-")}
          className={`${helper !== undefined ? styles._hasHelper : ""} ${
            validIndication ? styles.validIndicater : ""
          }`}
          type={passwordOpen ? "text" : "password"}
          placeholder=" "
          name={placeholder}
          required
          onChange={onChange}
          pattern={pattern}
        />
        <label htmlFor={"input-" + placeholder}>
          {placeholder}
          <span>✓</span>
        </label>
        <div className={styles.eye}>
          <input
            type="checkbox"
            id={"input-" + placeholder?.replaceAll(" ", "-") + "-password-eye"}
            onChange={handleChanged}
          />
          <label
            htmlFor={
              "input-" + placeholder?.replaceAll(" ", "-") + "-password-eye"
            }
          ></label>
        </div>
        {helper}
      </div>
    );
  } else {
    return (
      <div
        className={styles.InputField}
        data-testid="InputField"
        style={{ width: width || "300px" }}
      >
        <input
          id={"input-" + placeholder?.replaceAll(" ", "-")}
          className={`${helper !== undefined ? styles._hasHelper : ""} ${
            validIndication ? styles.validIndicater : ""
          }`}
          type={type}
          placeholder=" "
          name={placeholder}
          required
          onChange={onChange}
          pattern={pattern}
          data-original-value={originalValue}
          value={originalValue}
        />
        <label htmlFor={"input-" + placeholder?.replaceAll(" ", "-")}>
          {placeholder}
          <span>✓</span>
        </label>
        {helper}
      </div>
    );
  }
};

export default InputField;
