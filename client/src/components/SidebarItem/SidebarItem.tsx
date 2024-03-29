import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./SidebarItem.module.scss";

interface SidebarItemProps {
  children?: React.ReactNode;
  active?: boolean;
  imgsrc?: string;
  open?: boolean;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  active,
  imgsrc,
  open,
  path,
  onClick,
}: SidebarItemProps) => (
  <div
    className={`${styles.SidebarItem} ${
      active ? styles.SidebarItemActive : ""
    } `}
    data-testid="SidebarItem"
  >
    <Link to={path || ""} className={styles.Link}>
      <div
        className={`${styles.Wrapper} ${open ? styles.Open : styles.Closed}`}
        onClick={onClick}
        data-active={active}
        data-path={path}
        title={children?.toString()}
      >
        {imgsrc !== undefined ? (
          <img
            className={styles.Icon}
            src={imgsrc}
            alt={children?.toString()}
          />
        ) : (
          ""
        )}
        <p className={styles.ItemText}>{children}</p>
      </div>
    </Link>
  </div>
);

export default SidebarItem;
