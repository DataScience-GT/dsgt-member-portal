import React, { FC } from "react";
import styles from "./TextBlock.module.scss";

interface TextBlockProps {
  children?: React.ReactNode;
}

const TextBlock: FC<TextBlockProps> = ({ children }: TextBlockProps) => (
  <div className={styles.TextBlock} data-testid="TextBlock">
    <pre>{children}</pre>
  </div>
);

export default TextBlock;
