import React, { FC, useState } from "react";
import styles from "./MemberActionMenu.module.scss";

import threedots_icon from "../../assets/icons/menu-dots-vertical.svg";
import cross_icon from "../../assets/icons/cross-small-skinny.svg";

interface MemberActionMenuProps {
  enabled?: boolean;
  onEnableDisable?: () => void;
}

const MemberActionMenu: FC<MemberActionMenuProps> = ({
  enabled,
  onEnableDisable,
}: MemberActionMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <div className={styles.MemberActionMenu} data-testid="MemberActionMenu">
      <div className={styles.ThreeDotsContainer} onClick={openMenu}>
        <img
          className={styles.ThreeDots}
          src={threedots_icon}
          alt="Three Dots Icon"
          title="Click to see Actions"
        />
      </div>
      <div
        className={styles.ActionMenu}
        style={{ display: menuOpen ? "inherit" : "none" }}
      >
        <div className={styles.CloseContainer} onClick={closeMenu}>
          <img
            className={styles.Cross}
            src={cross_icon}
            alt="Cross Icon"
            title="Click to Close"
          />
        </div>
        <p
          className={styles.Action}
          onClick={() => {
            if (onEnableDisable) {
              onEnableDisable();
              closeMenu();
            }
          }}
        >
          {enabled ? "Disable" : "Enable"}
        </p>
      </div>
    </div>
  );
};

export default MemberActionMenu;
