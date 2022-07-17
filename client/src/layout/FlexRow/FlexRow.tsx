import React, { FC } from "react";
import styles from "./FlexRow.module.scss";

interface FlexRowProps {
  children?: React.ReactNode;
  gap?: number;
  spacing?: string;
  padding?: string;
}

const FlexRow: FC<FlexRowProps> = ({
  children,
  gap,
  spacing,
  padding,
}: FlexRowProps) => (
  <div
    className={styles.FlexRow}
    style={{ gap: `${gap}px`, justifyContent: spacing, padding: padding }}
    data-testid="FlexRow"
  >
    {children}
  </div>
);

export default FlexRow;
