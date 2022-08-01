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

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //handle all of the form elements updating (save input to state)
  const handleChange_fname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setFname(e.target.value);
  };
  const handleChange_lname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setLname(e.target.value);
  };
  const handleChange_email = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "");
    setEmail(e.target.value);
  };
  const handleChange_password = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    //check if billing data found
    await checkBillingDetailsExists(email, (data: Object) => {
      console.log(data);
      setEmailVerified(true);
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormSubmitRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    //attempt to register user
    console.log("1");
  };

  if (payment_status === "completed") {
    //show the register form with all of the questions
    return (
      <div className={styles.Register} data-testid="Register">
        <FlexRow spacing="center" align="center" height="100vh" padding="1em">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            {loading ? (
              <Loader />
            ) : !emailVerified ? (
              <form onSubmit={handleFormSubmitEmail}>
                <FlexColumn width="100%">
                  <h1 className={styles.Major}>Thank You!</h1>
                  <h2 className={styles.Minor}>
                    Please enter the email associated with the payment you just
                    made:
                  </h2>
                  <InputField
                    type="email"
                    placeholder="Email"
                    width="100%"
                    onChange={handleChange_email}
                  />
                  <ErrorText>{error}</ErrorText>
                  <FlexRow spacing="flex-end" width="100%">
                    <InputField
                      type={"submit"}
                      placeholder="Next"
                      width="fit-content"
                    />
                  </FlexRow>
                </FlexColumn>
              </form>
            ) : (
              <form onSubmit={handleFormSubmitRegister}>
                <FlexColumn width="100%" gap={10}>
                  <h1 className={styles.Minor}>
                    Please enter the following information:
                  </h1>
                  <FlexRow gap={10} spacing={"space-between"} width="100%">
                    <InputField
                      type="text"
                      placeholder="First Name"
                      name="fname"
                      width="45%"
                      onChange={handleChange_fname}
                      validIndication
                    />
                    <InputField
                      type="text"
                      placeholder="Last Name"
                      name="lname"
                      width="45%"
                      onChange={handleChange_lname}
                      validIndication
                    />
                  </FlexRow>
                  <InputField
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange_password}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    width="100%"
                    helper={<InputHelper lines={passwordHelperLines} />}
                    validIndication
                  />
                  <div className={styles.Datalist}>
                    <input
                      list="major-list"
                      id="major-choice"
                      name="major-choice"
                      placeholder=" "
                    />
                    <label htmlFor="major-choice">Major</label>
                    <datalist id="major-list">
                      <option value={"Aerospace Engineering"} />
                      <option
                        value={"Algorithms, Combinatorics, and Optimization"}
                      />
                      <option value={"Analytics"} />
                      <option
                        value={"Applied Languages and Intercultural Studies"}
                      />
                      <option value={"Applied Physics"} />
                      <option value={"Applied Physiology"} />
                      <option value={"Architecture"} />
                      <option value={"Biochemistry"} />
                      <option value={"Bioengineering"} />
                      <option value={"Bioinformatics"} />
                      <option value={"Biology"} />
                      <option value={"Biomedical Engineering"} />
                      <option value={"Biomedical Innovation and Development"} />
                      <option value={"Building Construction"} />
                      <option
                        value={"Building Construction and Facility Management"}
                      />
                      <option value={"Business Administration"} />
                      <option value={"Chemical and Biomolecular Engineering"} />
                      <option value={"Chemical Engineering"} />
                      <option value={"Chemistry"} />
                      <option value={"City and Regional Planning"} />
                      <option value={"Civil Engineering"} />
                      <option value={"Computational Media"} />
                      <option value={"Computational Science and Engineering"} />
                      <option value={"Computer Engineering"} />
                      <option value={"Computer Science"} />
                      <option value={"Cybersecurity"} />
                      <option value={"Digital Media"} />
                      <option value={"Earth and Atmospheric Sciences"} />
                      <option value={"Economics"} />
                      <option value={"Economics and International Affairs"} />
                      <option value={"Electrical Engineering"} />
                      <option value={"Electrical and Computer Engineering"} />
                      <option value={"Engineering Science and Mechanics"} />
                      <option value={"Environmental Engineering"} />
                      <option
                        value={"Geographic Information Science and Technology"}
                      />
                      <option value={"Global Economics and Modern Languages"} />
                      <option value={"Global Media and Cultures"} />
                      <option value={"Health Systems"} />
                      <option value={"History, Technology, and Society"} />
                      <option
                        value={
                          "History and Sociology of Technology and Science"
                        }
                      />
                      <option value={"Human-Computer Interaction"} />
                      <option value={"Human-Centered Computing"} />
                      <option value={"Industrial Design"} />
                      <option value={"Industrial Engineering"} />
                      <option value={"International Affairs"} />
                      <option
                        value={"International Affairs and Modern Languages"}
                      />
                      <option
                        value={"International Affairs, Science, and Technology"}
                      />
                      <option value={"International Logistics"} />
                      <option value={"International Security"} />
                      <option value={"Literature, Media, and Communication"} />
                      <option value={"Machine Learning"} />
                      <option value={"Management"} />
                      <option value={"Materials Science and Engineering"} />
                      <option value={"Mathematics"} />
                      <option value={"Mechanical Engineering"} />
                      <option value={"Medical Physics"} />
                      <option value={"Music Technology"} />
                      <option value={"Neuroscience"} />
                      <option value={"Nuclear Engineering"} />
                      <option value={"Nuclear and Radiological Engineering"} />
                      <option value={"Ocean Science and Engineering"} />
                      <option value={"Operations Research"} />
                      <option value={"Physics"} />
                      <option value={"Psychology"} />
                      <option value={"Public Policy"} />
                      <option value={"Quantitative Biosciences"} />
                      <option
                        value={"Quantitative and Computational Finance"}
                      />
                      <option value={"Real Estate Development"} />
                      <option value={"Robotics"} />
                      <option value={"Statistics"} />
                      <option value={"Supply Chain Engineering"} />
                      <option
                        value={
                          "Sustainable Energy and Environmental Management"
                        }
                      />
                      <option value={"Urban Design"} />
                      <option value={"Urban Analytics"} />
                    </datalist>
                  </div>
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>Are you a new member?</p>
                    <input type="radio" name="new-member" id="new-member" />
                    <label htmlFor="new-member">Yes</label>
                    <br />

                    <input
                      type="radio"
                      name="new-member"
                      id="existing-member"
                    />
                    <label htmlFor="existing-member">
                      No, I'm already a member of DSGT
                    </label>
                  </div>
                </FlexColumn>
              </form>
            )}
          </div>
        </FlexRow>
      </div>
    );
  } else {
    //show the payment initialization screen
    //-- Link to the stripe payment service
    return (
      <div className={styles.Register} data-testid="Register">
        <FlexRow
          width="100%"
          height="100vh"
          spacing="center"
          align="center"
          padding="1em"
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <FlexColumn width="100%">
              {/* <h1 className={styles.Major}>Register</h1> */}
              <h2 className={styles.Minor}>
                In order to become a registered member of DSGT, you first need
                to pay the membership dues.
              </h2>
              <p className={styles.Mini}>
                Make sure you know what being a member entails BEFORE paying.
              </p>
              <a
                className={styles.Link}
                href="https://buy.stripe.com/test_7sIg131iXb0CfiUdQQ"
              >
                Pay through Stripe →
              </a>
            </FlexColumn>
          </div>
        </FlexRow>
      </div>
    );
  }
};

export default Register;
