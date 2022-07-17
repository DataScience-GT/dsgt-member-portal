import React, { FC } from "react";
import styles from "./Parameter.module.scss";

interface ParameterProps {
  children?: React.ReactNode;
  optional?: boolean;
  type?: string;
  id?: string;
  description?: string;
  desc?: string;
}

const Parameter: FC<ParameterProps> = ({
  children,
  optional,
  type,
  id,
  description,
  desc,
}: ParameterProps) => (
  <div className={styles.Parameter} data-testid="Parameter">
    <input type="checkbox" id={"param-" + id} />
    <label htmlFor={"param-" + id}>
      {children} {optional !== undefined || type !== undefined ? "(" : ""}
      <span className={styles.Optional}>
        {optional !== undefined ? (optional ? "Optional" : "Required") : ""}
      </span>
      {optional !== undefined && type !== undefined ? ", " : ""}
      <span className={styles.Type}>{type}</span>
      {optional !== undefined || type !== undefined ? ") " : " "}
      <a className={styles.Hash} href={"#param-" + id}>
        #
      </a>
    </label>
    <p>{description || desc}</p>
  </div>
);

export default Parameter;
