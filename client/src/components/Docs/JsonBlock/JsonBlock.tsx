import React, { FC } from "react";
import styles from "./JsonBlock.module.scss";

interface JsonBlockProps {
  children?: React.ReactNode;
  jsonData?: Object;
  success?: boolean;
  input?: boolean;
  sticky?: boolean;
  nomargin?: boolean;
}

const JsonBlock: FC<JsonBlockProps> = ({
  children,
  jsonData,
  success,
  input,
  sticky,
  nomargin,
}: JsonBlockProps) => (
  <div
    className={`${styles.JsonBlock} ${sticky ? styles.Sticky : ""} ${
      nomargin ? styles.NoMargin : ""
    }`}
    data-testid="JsonBlock"
  >
    {success !== undefined ? (
      success ? (
        <div className={styles.SuccessHeader}>Success</div>
      ) : (
        <div className={styles.FailHeader}>Error</div>
      )
    ) : input !== undefined ? (
      <div className={styles.InputHeader}>Input</div>
    ) : (
      ""
    )}
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  </div>
);

export default JsonBlock;
