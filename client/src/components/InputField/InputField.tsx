import React, { FC, useState } from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
  required?: boolean;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.KeyboardEventHandler<HTMLInputElement>;
  pattern?: string;
  helper?: React.ReactNode;
  validIndication?: boolean;
  originalValue?: string;
  color?: string;
  bgcolor?: string;
  fontweight?: string;
}

const InputField: FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  required,
  width,
  onClick,
  onChange,
  pattern,
  helper,
  validIndication,
  originalValue,
  color,
  bgcolor,
  fontweight
}: InputFieldProps) => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  if (type === "submit") {
    return (
      <div
        className={styles.InputFieldSubmit}
        data-testid="InputField"
        style={{ width: width || "300px", fontWeight: fontweight || "500"}}
      >
        <input
          id={name || placeholder?.replaceAll(" ", "")}
          type="submit"
          onClick={onClick}
          name={name || placeholder?.replaceAll(" ", "") || "submit"}
          autoComplete={name || placeholder?.replaceAll(" ", "") || "submit"}
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
        style={{ width: width || "300px", color: color || "var(--foreground)", fontWeight: fontweight || "500" }}
      >
        <input
          id={name || placeholder?.replaceAll(" ", "")}
          className={`${helper !== undefined ? styles._hasHelper : ""} ${validIndication ? styles.validIndicater : ""
            }`}
          type={passwordOpen ? "text" : "password"}
          placeholder=" "
          name={name || placeholder?.replaceAll(" ", "")}
          autoComplete={name || placeholder?.replaceAll(" ", "")}
          required={required || true}
          onChange={onChange}
          pattern={pattern}
          style={{background: bgcolor || "var(--background)", color: color || "var(--foreground)"}}
        />
        <label htmlFor={placeholder}>
          {placeholder}
          <i className={required ? styles.Required : ""}>*</i>
          <span>✓</span>
        </label>
        <div className={styles.eye}>
          <input
            type="checkbox"
            id={placeholder?.replaceAll(" ", "") + "Passwordeye"}
            onChange={handleChanged}
          />
          <label
            htmlFor={placeholder?.replaceAll(" ", "") + "Passwordeye"}
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
        style={{ width: width || "300px", color: color || "var(--foreground)", fontWeight: fontweight || "500"}}
      >
        <input
          id={name || placeholder?.replaceAll(" ", "")}
          type={type}
          placeholder=" "
          name={name || placeholder?.replaceAll(" ", "")}
          autoComplete={name || placeholder?.replaceAll(" ", "")}
          required={required}
          onChange={onChange}
          pattern={pattern}
          data-original-value={originalValue}
          value={originalValue}
          style={{background: bgcolor || "var(--background)"}}
        />
        <label htmlFor={name || placeholder?.replaceAll(" ", "")}>
          {placeholder}
          <i className={required ? styles.Required : ""}>*</i>
          <span>✓</span>
        </label>
        {helper}
      </div>
    );
  }
};

export default InputField;
