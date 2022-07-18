import React, { FC } from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.KeyboardEventHandler<HTMLInputElement>;
  pattern?: string;
  helper?: React.ReactNode;
}

const InputField: FC<InputFieldProps> = ({
  type,
  placeholder,
  width,
  onClick,
  onChange,
  pattern,
  helper,
}: InputFieldProps) => {
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
          name="submit"
        />
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
          className={`${helper !== undefined ? styles._hasHelper : ""}`}
          type={type}
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
        {helper}
      </div>
    );
  }
};

export default InputField;
