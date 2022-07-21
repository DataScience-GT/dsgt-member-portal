import React, { FC } from "react";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  children?: React.ReactNode;
  active?: boolean;
  imgsrc?: string;
  open?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  active,
  imgsrc,
  open,
  onClick,
}: SidebarItemProps) => (
  <div
    className={`${styles.SidebarItem} ${
      active ? styles.SidebarItemActive : ""
    } `}
    data-testid="SidebarItem"
  >
    <div
      className={`${styles.Wrapper} ${open ? styles.Open : styles.Closed}`}
      onClick={onClick}
      data-active={active}
    >
      {imgsrc !== undefined ? (
        <img className={styles.Icon} src={imgsrc} alt={children?.toString()} />
      ) : (
        ""
      )}
      <p className={styles.ItemText}>{children}</p>
    </div>
  </div>
);

export default SidebarItem;
