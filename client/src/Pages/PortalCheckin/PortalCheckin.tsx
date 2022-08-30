import React, { FC, useState } from "react";
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

const PortalCheckin: FC<PortalCheckinProps> = () => {
  // const [scan, setScan] = useState(false);
  const [page, setPage] = useState<CheckinPage>(CheckinPage.Create);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
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
        {page === CheckinPage.Scan ? <div>b</div> : ""}
      </FlexColumn>
    </div>
  );
};

export default PortalCheckin;
