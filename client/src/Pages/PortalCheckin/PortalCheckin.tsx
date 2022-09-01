import React, { FC, useEffect, useState } from "react";

import styles from "./PortalCheckin.module.scss";
import portal_styles from "../PortalPage.module.scss";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";

import {
  checkinUser,
  createCheckinEvent,
  getCheckinEvents,
  result_getCheckinEvents,
} from "../../API/Checkin";
import Modal, { ModalPreset } from "../../components/Modal/Modal";
import { handleChange_input_string } from "../../Scripts/InputHandler";
import ErrorText from "../../components/ErrorText/ErrorText";
import SuccessText from "../../components/SuccessText/SuccessText";

const QrReader = require("react-qr-reader");

interface PortalCheckinProps {}

enum CheckinPage {
  Manage = "manage",
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
  const [page, setPage] = useState<CheckinPage>(CheckinPage.Manage);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<result_getCheckinEvents[]>();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const [data, setData] = useState("");
  const [scanEventId, setScanEventId] = useState(-1);
  const [status, setStatus] = useState<StatusMessage>({
    type: "success",
    message: "",
  });
  const [canScan, setCanScan] = useState(true);

  useEffect(() => {
    getCheckinEvents((data) => {
      setLoading(false);
      setEvents(data);
      if (data && data.length) {
        setScanEventId(data[0].event_id);
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowCreateModal(true);
  };

  const handleCreateEvent = async () => {
    if (!eventName) {
      setError("Missing name");
      return;
    }
    //attempt to create the event
    await createCheckinEvent(eventName, () => {
      setSuccess("Check-in event created.");
      setEventName("");
    });
  };

  const handleScan = async (data: any) => {
    if (canScan && data) {
      setStatus({ type: "success", message: "" });
      //check scan
      setCanScan(false);
      await checkinUser(scanEventId, data.toString(), (message) => {
        setStatus({ type: "success", message });
      })
        .catch((err) => {
          setStatus({ type: "error", message: err.message });
        })
        .finally(() => {
          setTimeout(() => {
            setCanScan(true);
          }, 2000);
        });
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
        {page === CheckinPage.Manage ? (
          <FlexColumn>
            {loading
              ? "loading..."
              : events && events.length
              ? events?.map((e, i) => (
                  <h2
                    className={portal_styles.Minor}
                    key={e.event_id}
                    data-event-id={e.event_id}
                  >
                    {e.name}
                  </h2>
                ))
              : "No check-in events."}
          </FlexColumn>
        ) : (
          ""
        )}
        {page === CheckinPage.Create ? (
          <Form
            onSubmit={handleSubmit}
            maxWidth="100%"
            submitPlaceholder="Create"
          >
            <InputField
              onChange={(e) => {
                handleChange_input_string(e, setEventName);
              }}
              placeholder="Name"
              type="text"
              width="auto"
              required
            />
            <ErrorText>{error}</ErrorText>
            <SuccessText>{success}</SuccessText>
          </Form>
        ) : (
          ""
        )}
        {page === CheckinPage.Scan ? (
          <>
            {loading ? (
              "loading..."
            ) : events && events.length ? (
              <FlexColumn gap="1em" width="100%">
                <h2 className={portal_styles.Minor}>Check-in Event:</h2>
                <InputDropdown
                  options={events?.map((x) => x.name)}
                  values={events?.map((x) => x.event_id)}
                  setState={setScanEventId}
                />
                <QrReader
                  // constraints={{ facingMode: "environment", aspectRatio: 1 }}
                  // videoStyle={{ width: "100%" }}
                  scanDelay={scan_setup.delay}
                  onScan={handleScan}
                  onError={(err: any) => {
                    console.error(err);
                    setStatus({
                      type: "error",
                      message: err.message,
                    });
                  }}
                  style={{ maxWidth: "100%" }}
                  // videoContainerStyle={{ width: "100%"  }}
                  className={styles.ScanVideo}
                  // delay={scan_setup.delay}

                  // onError={this.handleError}
                  // onScan={this.handleScan}
                />
                <p className={`${styles.StatusText} ${styles[status?.type]}`}>
                  {status.message}
                </p>
              </FlexColumn>
            ) : (
              "No Events"
            )}
          </>
        ) : (
          ""
        )}
        <Modal
          open={showCreateModal}
          setOpen={setShowCreateModal}
          preset={ModalPreset.Confirm}
          handleConfirmed={handleCreateEvent}
        >
          Are you sure you would like to create this check-in event?
        </Modal>
      </FlexColumn>
    </div>
  );
};

export default PortalCheckin;
