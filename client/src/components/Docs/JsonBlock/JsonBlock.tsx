import React, { FC } from "react";
import styles from "./JsonBlock.module.scss";

interface JsonBlockProps {
  children?: React.ReactNode;
  jsonData?: Object;
}

const JsonBlock: FC<JsonBlockProps> = ({
  children,
  jsonData,
}: JsonBlockProps) => (
  <div className={styles.JsonBlock} data-testid="JsonBlock">
    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
  </div>
);

export default JsonBlock;
