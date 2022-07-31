import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import InputHelper from "../../components/InputHelper/InputHelper";
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

  if (payment_status === "completed") {
    //show the register form with all of the questions
    return (
      <div className={styles.Register} data-testid="Register">
        <FlexRow spacing="center" align="center" height="100vh">
          <div>
            <FlexColumn width="300px">
              <h1>Register</h1>
              <InputField
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
              />
              <InputField
                type="email"
                placeholder="Email"
                width="100%"
                // onChange={handleChange_email}
                validIndication
              />
              <InputField
                type="password"
                placeholder="Password"
                // onChange={handleChange_password}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                width="100%"
                helper={<InputHelper lines={passwordHelperLines} />}
                validIndication
              />
              <InputField type={"submit"} placeholder="submit" />
            </FlexColumn>
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
