import React, { FC } from "react";
import styles from "./MiniText.module.scss";

interface MiniTextProps {
  children?: React.ReactNode;
}

const MiniText: FC<MiniTextProps> = ({ children }: MiniTextProps) => (
  <div className={styles.MiniText} data-testid="MiniText">
    {children}
  </div>
);

export default MiniText;
