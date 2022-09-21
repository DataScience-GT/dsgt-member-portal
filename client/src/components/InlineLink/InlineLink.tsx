import React, { FC } from "react";
import styles from "./InlineLink.module.scss";

interface InlineLinkProps {
  to?: string;
  children?: React.ReactNode;
  margin?: string;
}

const InlineLink: FC<InlineLinkProps> = ({ to, children, margin }) => (
  <a
    className={styles.InlineLink}
    data-testid="InlineLink"
    href={to}
    style={{ margin: margin }}
  >
    {children}
  </a>
);

export default InlineLink;
