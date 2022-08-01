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
                      required
                    />
                    <InputField
                      type="text"
                      placeholder="Last Name"
                      name="lname"
                      width="45%"
                      onChange={handleChange_lname}
                      validIndication
                      required
                    />
                  </FlexRow>
                  <InputField
                    type="password"
                    placeholder="Account Password"
                    name="password"
                    onChange={handleChange_password}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    width="100%"
                    helper={<InputHelper lines={passwordHelperLines} />}
                    validIndication
                    required
                  />
                  <div className={styles.Datalist}>
                    <input
                      list="major-list"
                      id="major-choice"
                      name="major-choice"
                      placeholder=" "
                    />
                    <label htmlFor="major-choice">
                      What is your major?
                      <span className={styles.Required}>*</span>
                    </label>
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
                  <div className={styles.Datalist}>
                    <input
                      list="minor-list"
                      id="minor-choice"
                      name="minor-choice"
                      placeholder=" "
                    />
                    <label htmlFor="minor-choice">
                      What is your minor (if applicable)?
                    </label>
                    <datalist id="minor-list">
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
                  <InputField
                    type={"email"}
                    placeholder="What is your GT email address?"
                    name="GtEmail"
                    width="100%"
                    validIndication
                    required
                  />
                  <InputField
                    type={"email"}
                    placeholder="What is your personal email address? (optional)"
                    name="PersonalEmail"
                    width="100%"
                    validIndication
                    required
                  />
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      Are you a new member?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="member" id="new-member" />
                    <label htmlFor="new-member">Yes</label>
                    <br />

                    <input type="radio" name="member" id="existing-member" />
                    <label htmlFor="existing-member">
                      No, I'm already a member of DSGT
                    </label>
                  </div>
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      What is your current year of study?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="study-year" id="year-one" />
                    <label htmlFor="year-one">1st Year</label>
                    <br />

                    <input type="radio" name="study-year" id="year-two" />
                    <label htmlFor="year-two">2nd Year</label>
                    <br />

                    <input type="radio" name="study-year" id="year-three" />
                    <label htmlFor="year-three">3rd Year</label>
                    <br />

                    <input type="radio" name="study-year" id="year-four" />
                    <label htmlFor="year-four">4th Year</label>
                    <br />

                    <input type="radio" name="study-year" id="year-five" />
                    <label htmlFor="year-five">5th Year+</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-masters-phd"
                    />
                    <label htmlFor="year-masters-phd">
                      Masters/PhD Student
                    </label>
                    <br />
                  </div>
                  {/* GENDER */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      What is your gender?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="gender" id="gender-female" />
                    <label htmlFor="gender-female">Female</label>
                    <br />

                    <input type="radio" name="gender" id="gender-male" />
                    <label htmlFor="gender-male">Male</label>
                    <br />

                    <input type="radio" name="gender" id="gender-prefer-none" />
                    <label htmlFor="gender-prefer-none">
                      Prefer not to say
                    </label>
                    <br />

                    <input type="radio" name="gender" id="gender-other" />
                    <label htmlFor="gender-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="gender"
                      />
                    </label>
                    <br />
                  </div>
                  {/* Ethnicity */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      What is your ethnicity?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="ethnicity" id="ethnicity-AIAN" />
                    <label htmlFor="ethnicity-AIAN">
                      American Indian or Alaska Native
                    </label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-AA" />
                    <label htmlFor="ethnicity-AA">
                      Black or African American
                    </label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-EA" />
                    <label htmlFor="ethnicity-EA">East Asian</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-Latino"
                    />
                    <label htmlFor="ethnicity-Latino">Hispanic or Latino</label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-ME" />
                    <label htmlFor="ethnicity-ME">Middle Eastern</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-Hawaii"
                    />
                    <label htmlFor="ethnicity-Hawaii">
                      Native Hawaiian or Other Pacific Islander
                    </label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-SA" />
                    <label htmlFor="ethnicity-SA">South Asian</label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-SEA" />
                    <label htmlFor="ethnicity-SEA">Southeast Asian</label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-white" />
                    <label htmlFor="ethnicity-white">White</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-prefer-none"
                    />
                    <label htmlFor="ethnicity-prefer-none">
                      Prefer not to say
                    </label>
                    <br />

                    <input type="radio" name="ethnicity" id="ethnicity-other" />
                    <label htmlFor="ethnicity-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="ethnicity"
                      />
                    </label>
                    <br />
                  </div>
                  {/* Instate? */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      Are you an in-state, out-of-state, or international
                      student?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="location" id="location-IS" />
                    <label htmlFor="location-IS">In-state</label>
                    <br />

                    <input type="radio" name="location" id="location-OOS" />
                    <label htmlFor="location-OOS">Out-of-state</label>
                    <br />

                    <input
                      type="radio"
                      name="location"
                      id="location-International"
                    />
                    <label htmlFor="location-International">
                      International
                    </label>
                    <br />
                  </div>
                  {/* Experience */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      How much Data Science experience would you say you have?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input
                      type="radio"
                      name="experience"
                      id="experience-none"
                    />
                    <label htmlFor="experience-none">No experience</label>
                    <br />

                    <input
                      type="radio"
                      name="experience"
                      id="experience-beginner"
                    />
                    <label htmlFor="experience-beginner">
                      Beginner (familiar with Data Science/just started learning
                      about it)
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="experience"
                      id="experience-intermediate"
                    />
                    <label htmlFor="experience-intermediate">
                      Intermediate (have worked with/taken a class in least one
                      branch of Data Science)
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="experience"
                      id="experience-advanced"
                    />
                    <label htmlFor="experience-advanced">
                      Advanced (have professional experience or worked with
                      multiple branches of Data Science)
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="experience"
                      id="experience-expert"
                    />
                    <label htmlFor="experience-expert">
                      Expert (have multiple/many years of experience with Data
                      Science)
                    </label>
                    <br />
                  </div>
                  {/* Interests */}
                  <div className={styles.Checkbox}>
                    <p className={styles.Mini}>
                      What branch of Data Science are you interested in learning
                      about (you may choose more than one)?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="checkbox" name="interests" id="interests-CS" />
                    <label htmlFor="interests-CS">
                      Computer Science/Programming
                    </label>
                    <br />

                    <input type="checkbox" name="interests" id="interests-DA" />
                    <label htmlFor="interests-DA">Data Analysis</label>
                    <br />

                    <input type="checkbox" name="interests" id="interests-DV" />
                    <label htmlFor="interests-DV">Data Visualization</label>
                    <br />

                    <input type="checkbox" name="interests" id="interests-ML" />
                    <label htmlFor="interests-ML">Machine Learning</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-Stats"
                    />
                    <label htmlFor="interests-Stats">Statistics</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-other"
                    />
                    <label htmlFor="interests-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="interests"
                      />
                    </label>
                    <br />
                  </div>
                  <ErrorText>{error}</ErrorText>
                  <FlexRow spacing="flex-end" width="100%">
                    <InputField
                      type={"submit"}
                      placeholder="Continue"
                      width="fit-content"
                    />
                  </FlexRow>
                  {/* list of opportunities */}
                  <div className={styles.ContentBlock}>
                    <h1 className={"Major"}>Get Involved!</h1>
                    <p>
                      Which DSGT opportunities are you interested in for this
                      semester? You must participate in at least one opportunity
                      below to be an active member in the club:
                      <br />
                      <br />
                      - Projects <br />
                      - Bootcamp <br />
                      - Leadership team <br />
                      <br />
                      You'll have the chance to select multiple opportunities if
                      you're interested!
                    </p>
                  </div>
                  {/* Projects */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      Are you interested in projects?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="projects" id="projects-yes" />
                    <label htmlFor="projects-yes">Yes</label>
                    <br />

                    <input type="radio" name="projects" id="projects-no" />
                    <label htmlFor="projects-no">No</label>
                    <br />
                  </div>
                  {/* Bootcamp */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      Are you interested in bootcamp?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input type="radio" name="bootcamp" id="bootcamp-yes" />
                    <label htmlFor="bootcamp-yes">Yes</label>
                    <br />

                    <input type="radio" name="bootcamp" id="bootcamp-no" />
                    <label htmlFor="bootcamp-no">No</label>
                    <br />
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
