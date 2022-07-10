import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
}

const FlexRow: FC<FlexRowProps> = ({ children }: FlexRowProps) => (
  <div className={styles.FlexRow} data-testid="FlexRow">
    {children}
  </div>
);

export default FlexRow;
