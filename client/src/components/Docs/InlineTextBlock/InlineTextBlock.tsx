import React, { FC } from "react";
import styles from "./InlineTextBlock.module.scss";

interface InlineTextBlockProps {
  children?: React.ReactNode;
}

const InlineTextBlock: FC<InlineTextBlockProps> = ({
  children,
}: InlineTextBlockProps) => (
  <div className={styles.InlineTextBlock} data-testid="InlineTextBlock">
    {children}
  </div>
);

export default InlineTextBlock;
