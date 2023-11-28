import React, { Dispatch, FC, SetStateAction } from "react";
import styles from "./Modal.module.scss";

import close_icon from "../../assets/icons/cross-small-skinny.svg";
import FlexRow from "../../layout/FlexRow/FlexRow";

export enum ModalPreset {
  Confirm = "ConfirmPreset",
  Change = "ChangePreset",
}

interface ModalProps {
  open?: boolean;
  children?: React.ReactNode;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  preset?: ModalPreset;
  setConfirmed?: Dispatch<SetStateAction<boolean>>;
  handleConfirmed?: () => void;
  opacity?: string;
}

const Modal: FC<ModalProps> = ({
  open,
  children,
  setOpen,
  preset,
  setConfirmed,
  handleConfirmed,
  opacity
}: ModalProps) => {
  const closeModal = () => {
    if (setOpen !== undefined) setOpen(false);
  };
  const handleConfirm = async () => {
    if (setConfirmed !== undefined) {
      setConfirmed(true);
      closeModal();
    }
    if (handleConfirmed !== undefined) {
      handleConfirmed();
      closeModal();
    }
  };
  if (preset === ModalPreset.Confirm) {
    return (
      <div
        className={`${styles.Modal} ${open ? styles.Open : styles.Closed}`}
        data-testid="Modal"
      >
        <div className={styles.bg} onClick={closeModal}></div>
        <div className={styles.Menu}>
          <img
            className={styles.MenuClose}
            src={close_icon}
            alt="Close Icon"
            onClick={closeModal}
          />
          <div className={styles.Message}>{children}</div>
          <FlexRow spacing="flex-end">
            <button className={styles.Cancel} onClick={closeModal}>
              Cancel
            </button>
            <button className={styles.Confirm} onClick={handleConfirm}>
              Confirm
            </button>
          </FlexRow>
        </div>
      </div>
    );
  }
  if (preset === ModalPreset.Change) {
    return (
      <div
        className={`${styles.Modal} ${open ? styles.Open : styles.Closed}`}
        data-testid="Modal"
      >
        <div className={styles.bg} onClick={closeModal}></div>
        <div className={styles.Menu}>
          <img
            className={styles.MenuClose}
            src={close_icon}
            alt="Close Icon"
            onClick={closeModal}
          />
          {children}
          <FlexRow spacing="flex-end">
            <button className={styles.Cancel} onClick={closeModal}>
              Cancel
            </button>
            <button className={styles.Confirm} onClick={handleConfirm}>
              Submit
            </button>
          </FlexRow>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.Modal} ${open ? styles.Open : styles.Closed}`}
        data-testid="Modal"
      >
        <div className={styles.bg} onClick={closeModal}></div>
        <div className={styles.Menu}>
          <img
            className={styles.MenuClose}
            src={close_icon}
            alt="Close Icon"
            onClick={closeModal}
          />
          {children}
        </div>
      </div>
    );
  }
};

export default Modal;
