import React, { FC } from "react";
import styles from "./SelectList.module.scss";

interface SelectListProps {
  title?: string;
  values?: any[];
  keys?: any[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

const SelectList: FC<SelectListProps> = ({ title, keys, values }) => (
  <div className={styles.SelectList} data-testid="SelectList">
    {values?.map((v) => (
      <p>{v}</p>
    ))}
  </div>
);

export default SelectList;
