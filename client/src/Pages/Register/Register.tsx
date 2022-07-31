import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { checkBillingDetailsExists } from "../../API/Register";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
import Loader from "../../components/Loader/Loader";
import FlexColumn from "../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../layout/FlexRow/FlexRow";
import styles from "./Register.module.scss";

interface RegisterProps {}

const passwordHelperLines = [
  "Requires:",
  "1 Capital Letter",
  "1 Lowercase Letter",
  "1 Number",
  "8 Total Characters",
];

const Register: FC<RegisterProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const payment_status = searchParams.get("payment_status");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res = await checkBillingDetailsExists("rambergerjohn@gmail.com");
    console.log(res);
  };

  if (payment_status === "completed") {
    //show the register form with all of the questions
    return (
      <div className={styles.Register} data-testid="Register">
        <FlexRow spacing="center" align="center" height="100vh">
          <div>
            <form onSubmit={handleFormSubmit}>
              <FlexColumn width="500px">
                <h1 className={styles.Major}>Thank You!</h1>
                <h2 className={styles.Minor}>
                  Please enter the email associated with the payment you just
                  made:
                </h2>
                {/* <InputField
                type="text"
                placeholder="First Name"
                width="100%"
                // onChange={handleChange_fname}
                validIndication
              />
              <InputField
                type="text"
                placeholder="Last Name"
                width="100%"
                // onChange={handleChange_lname}
                validIndication
              /> */}
                <ErrorText>{error}</ErrorText>
                <InputField
                  type="email"
                  placeholder="Email"
                  width="100%"
                  // onChange={handleChange_email}
                />
                {/* <InputField
                type="password"
                placeholder="Password"
                // onChange={handleChange_password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                width="100%"
                helper={<InputHelper lines={passwordHelperLines} />}
                validIndication
              /> */}
                <FlexRow spacing="flex-end" width="100%">
                  <InputField
                    type={"submit"}
                    placeholder="Next"
                    width="fit-content"
                  />
                </FlexRow>
              </FlexColumn>
            </form>
          </div>
        </FlexRow>
      </div>
    );
  } else {
    //show the payment initialization screen
    //-- Link to the stripe payment service
    return (
      <div className={styles.Register} data-testid="Register">
        Register Component
      </div>
    );
  }
};

export default Register;
