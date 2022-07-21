import React, { FC } from "react";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  active,
  onClick,
}: SidebarItemProps) => (
  <div
    className={`${styles.SidebarItem} ${
      active ? styles.SidebarItemActive : ""
    } `}
    data-testid="SidebarItem"
  >
    <div
      className={styles.SidebarItemWrapper}
      onClick={onClick}
      data-active={active}
    >
      {children}
    </div>
  </div>
);

export default SidebarItem;
