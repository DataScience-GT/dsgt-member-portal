import React, { FC, useState } from "react";
import { QrReader, OnResultFunction } from "react-qr-reader";

import styles from "./PortalCheckin.module.scss";
import portal_styles from "../PortalPage.module.scss";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";

interface PortalCheckinProps {}

enum CheckinPage {
  Create = "create",
  Scan = "scan",
}

const scan_setup = {
  delay: 3000,
};

type StatusMessage = {
  type: "success" | "error";
  message: string;
};

const PortalCheckin: FC<PortalCheckinProps> = () => {
  // const [scan, setScan] = useState(false);
  const [page, setPage] = useState<CheckinPage>(CheckinPage.Create);
  const [data, setData] = useState("No result");
  const [status, setStatus] = useState<StatusMessage>({
    type: "success",
    message: "success123",
  });
  const [canScan, setCanScan] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
  };

  const handleScan: OnResultFunction = (data) => {
    if (canScan && data) {
      //check scan
      //show success or fail
      // setData(data.toString());
      let res: StatusMessage = {
        type: "error",
        message: "error123",
      };
      setStatus(res);
      setCanScan(false);
      setTimeout(() => {
        setCanScan(true);
        setStatus({
          type: "success",
          message: "success123",
        });
      }, 2000);
    }
  };

  return (
    <div
      className={`${styles.PortalCheckin} ${portal_styles.PortalPage}`}
      data-testid="PortalCheckin"
    >
      <h1 className={portal_styles.Major}>Check In</h1>
      <FlexColumn gap="1em">
        <InputDropdown
          values={Object.values(CheckinPage)}
          options={Object.keys(CheckinPage)}
          initialValue={page}
          setState={setPage}
        />
        {page === CheckinPage.Create ? (
          <Form
            onSubmit={handleSubmit}
            maxWidth="100%"
            submitPlaceholder="Create"
          >
            <InputField placeholder="Name" type="text" required />
          </Form>
        ) : (
          ""
        )}
        {page === CheckinPage.Scan ? (
          <>
            <QrReader
              constraints={{ facingMode: "environment", aspectRatio: 1 }}
              // videoStyle={{ width: "100%" }}
              scanDelay={scan_setup.delay}
              onResult={handleScan}
              // videoContainerStyle={{ width: "100%"  }}
              className={styles.ScanVideo}
              // delay={scan_setup.delay}

              // onError={this.handleError}
              // onScan={this.handleScan}
            />
            <p className={`${styles.StatusText} ${styles[status?.type]}`}>
              {status.message}
            </p>
          </>
        ) : (
          ""
        )}
      </FlexColumn>
    </div>
  );
};

export default PortalCheckin;
