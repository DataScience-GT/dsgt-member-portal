import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: number;
}

const FlexRow: FC<FlexRowProps> = ({ children, gap }: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{ gap: `${gap}px` }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
