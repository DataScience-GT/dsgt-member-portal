import React, { FC } from "react";
import styles from "./JsonBlock.module.scss";

interface JsonBlockProps {
  children?: React.ReactNode;
  jsonData?: Object;
  success?: boolean;
}

const JsonBlock: FC<JsonBlockProps> = ({
  children,
  jsonData,
  success,
}: JsonBlockProps) => (
  <div className={styles.JsonBlock} data-testid="JsonBlock">
    {success !== undefined ? (
      success ? (
        <div className={styles.SuccessHeader}>Success</div>
      ) : (
        <div className={styles.FailHeader}>Error</div>
      )
    ) : (
      ""
    )}
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  </div>
);

export default JsonBlock;
