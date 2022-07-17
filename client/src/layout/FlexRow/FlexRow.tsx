import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
}

const FlexRow: FC<FlexRowProps> = ({
  children,
  gap,
  spacing,
}: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{ gap: `${gap}px`, justifyContent: spacing }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
