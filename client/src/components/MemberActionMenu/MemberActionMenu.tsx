import React, { FC, useState } from "react";
import styles from "./MemberActionMenu.module.scss";

import threedots_icon from "../../assets/icons/menu-dots-vertical.svg";
import cross_icon from "../../assets/icons/cross-small-skinny.svg";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";

interface MemberActionMenuProps {
  enabled?: number;
  onAnything?: () => void;
  onEnableDisable?: () => void;
  onChangeRole?: () => void;
}

const MemberActionMenu: FC<MemberActionMenuProps> = ({
  enabled,
  onAnything,
  onEnableDisable,
  onChangeRole,
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
        <FlexColumn>
          <p
            className={styles.Action}
            onClick={() => {
              if (onEnableDisable) {
                if (onAnything) onAnything();
                onEnableDisable();
                closeMenu();
              }
            }}
          >
            {enabled == 1 || enabled == 2 ? "Disable" : "Enable"}
          </p>
          <p
            className={styles.Action}
            onClick={() => {
              if (onChangeRole) {
                if (onAnything) onAnything();
                onChangeRole();
                closeMenu();
              }
            }}
          >
            Change Role
          </p>
        </FlexColumn>
      </div>
    </div>
  );
};

export default MemberActionMenu;
