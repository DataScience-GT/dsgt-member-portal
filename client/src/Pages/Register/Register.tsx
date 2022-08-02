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
  //generic states (used for most/all forms)
  const [searchParams, setSearchParams] = useSearchParams();
  const payment_status = searchParams.get("payment_status");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [screen, setScreen] = useState(0);
  const [error, setError] = useState("");
  //--------------- ---------------
  //--------------- First Form (Payment mail) ---------------
  const [paymentEmail, setPaymentEmail] = useState("");
  const handleChange_paymentemail = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9@. ]/g, "");
    setPaymentEmail(e.target.value);
  };
  //handle form submission
  const handleFormSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    //check if billing data found
    await checkBillingDetailsExists(paymentEmail, (data: Object) => {
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

  //--------------- Second Form (Personal/Academic info) ---------------
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [gtemail, setGtemail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [newMember, setNewMember] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [interests, setInterests] = useState([""]);
  const [interestsOtherChecked, setInterestsOtherChecked] = useState(false);
  const [interestsOther, setInterestsOther] = useState("");

  //handle all of the form elements updating (save input to state)
  const handleChange_fname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setFname(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };
  const handleChange_lname = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.target.value = e.currentTarget.value.replace(/[^a-zA-Z0-9 ]/g, "");
    setLname(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_password = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_major = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setMajor(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_minor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setMinor(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_gtemail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setGtemail(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_personalemail = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setPersonalEmail(e.currentTarget.value);
    // console.log(e.currentTarget.value);
  };

  const handleChange_newmember = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //radio input -- get value of label (next element)
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    setNewMember(newValue);
    //console.log(newValue);
  };

  const handleChange_studyyear = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //radio input -- get value of label (next element)
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    setStudyYear(newValue);
    //console.log(newValue);
  };

  const handleChange_genderRadio = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //radio input -- get value of label (next element)
    //check if label has input
    // console.log(e.currentTarget.nextElementSibling?.lastChild);
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    if (e.currentTarget.getAttribute("data-value")?.toLowerCase() === "other") {
      //set value to input value
      let input = e.currentTarget.nextElementSibling
        ?.lastChild as HTMLInputElement;
      newValue = input.value;
    }
    setGender(newValue);
    //console.log(newValue);
  };
  const handleChange_genderOther = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //other input
    let newValue = e.currentTarget.value;
    (
      e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement
    ).checked = true;
    setGender(newValue);
    //console.log(newValue);
  };

  const handleChange_ethnicityRadio = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //radio input -- get value of label (next element)
    //check if label has input
    // console.log(e.currentTarget.nextElementSibling?.lastChild);
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    if (e.currentTarget.getAttribute("data-value")?.toLowerCase() === "other") {
      //set value to input value
      let input = e.currentTarget.nextElementSibling
        ?.lastChild as HTMLInputElement;
      newValue = input.value;
    }
    setEthnicity(newValue);
    //console.log(newValue);
  };
  const handleChange_ethnicityOther = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //other input
    let newValue = e.currentTarget.value;
    (
      e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement
    ).checked = true;
    setEthnicity(newValue);
    //console.log(newValue);
  };

  const handleChange_location = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //radio input -- get value of label (next element)
    //check if label has input
    // console.log(e.currentTarget.nextElementSibling?.lastChild);
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    setLocation(newValue);
    //console.log(newValue);
  };

  const handleChange_experience = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //radio input -- get value of label (next element)
    //check if label has input
    // console.log(e.currentTarget.nextElementSibling?.lastChild);
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    setExperience(newValue);
    //console.log(newValue);
  };

  const handleChange_interestsCheckbox = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //radio input -- get value of label (next element)
    //check if label has input
    // console.log(e.currentTarget.nextElementSibling?.lastChild);
    let newValue =
      e.currentTarget.getAttribute("data-value") ||
      e.currentTarget.nextElementSibling?.innerHTML.toString() ||
      e.currentTarget.id;
    if (e.currentTarget.checked) {
      //add to list
      let newInterests = [...interests, newValue];
      if (interests.length === 1 && interests[0] === "") {
        newInterests = [newValue];
      }
      setInterests(newInterests);
      // console.log(newInterests);
    } else {
      //remove from list
      let index = interests.indexOf(newValue);
      let newInterests;
      if (interests.length === 1 && interests[0] === newValue) {
        newInterests = [""];
      } else if (index > -1) {
        newInterests = interests;
        newInterests.splice(index, 1);
      }

      if (newInterests) {
        setInterests(newInterests);
        // console.log(newInterests);
      }
    }
  };

  const handleChange_interestsOtherCheckbox = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setInterestsOtherChecked(e.currentTarget.checked);
    // console.log(e.currentTarget.checked);
  };
  const handleChange_interestsOtherInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //other input
    let newValue = e.currentTarget.value;
    (
      e.currentTarget.parentElement?.previousElementSibling as HTMLInputElement
    ).checked = true;
    setInterestsOther(newValue);
    // //console.log(newValue);
  };

  const handleFormSubmitRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setError("");
    // setLoading(true);
    e.preventDefault();
    //confirm ALL data
    if (
      !(
        fname &&
        lname &&
        password &&
        gtemail &&
        major &&
        newMember &&
        studyYear &&
        gender &&
        ethnicity &&
        location &&
        experience
      )
    ) {
      setError("Missing one or more required fields.");
      return;
    }
    if (
      (interests.length <= 0 ||
        (interests.length === 1 && interests[0] === "")) &&
      (!interestsOtherChecked || (interestsOtherChecked && !interestsOther))
    ) {
      //no interests selected
      setError("You must select at least one interest.");
      return;
    }
    setScreen(1);

    //attempt to register user
  };

  // ------------------------- screen 1 -------------------------------
  const [interestedProjects, setInterestedProjects] = useState(false);
  const handleFormSubmitScreen1 = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    setError("");
    // setLoading(true);
    e.preventDefault();
    //confirm ALL data

    //save data

    //change screens
    setScreen(1);
  };

  if (payment_status === "completed" && screen === 0) {
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
                    onChange={handleChange_paymentemail}
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
                      onChange={handleChange_major}
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
                      onChange={handleChange_minor}
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
                    name="Email"
                    width="100%"
                    pattern="\S+@gatech.edu"
                    validIndication
                    required
                    onChange={handleChange_gtemail}
                  />
                  <InputField
                    type={"email"}
                    placeholder="What is your personal email address? (optional)"
                    name="PersonalEmail"
                    width="100%"
                    validIndication
                    required={false}
                    onChange={handleChange_personalemail}
                  />
                  {/* new member? */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      Are you a new member?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input
                      type="radio"
                      name="member"
                      id="new-member"
                      data-value={true}
                      onChange={handleChange_newmember}
                    />
                    <label htmlFor="new-member">Yes</label>
                    <br />

                    <input
                      type="radio"
                      name="member"
                      id="existing-member"
                      data-value={false}
                      onChange={handleChange_newmember}
                    />
                    <label htmlFor="existing-member">
                      No, I'm already a member of DSGT
                    </label>
                  </div>
                  {/* what year of study? */}
                  <div className={styles.Radio}>
                    <p className={styles.Mini}>
                      What is your current year of study?
                      <span className={styles.Required}>*</span>
                    </p>
                    <input
                      type="radio"
                      name="study-year"
                      id="year-one"
                      onChange={handleChange_studyyear}
                    />
                    <label htmlFor="year-one">1st Year</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-two"
                      onChange={handleChange_studyyear}
                    />
                    <label htmlFor="year-two">2nd Year</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-three"
                      onChange={handleChange_studyyear}
                    />
                    <label htmlFor="year-three">3rd Year</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-four"
                      onChange={handleChange_studyyear}
                    />
                    <label htmlFor="year-four">4th Year</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-five"
                      onChange={handleChange_studyyear}
                    />
                    <label htmlFor="year-five">5th Year+</label>
                    <br />

                    <input
                      type="radio"
                      name="study-year"
                      id="year-masters-phd"
                      onChange={handleChange_studyyear}
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
                    <input
                      type="radio"
                      name="gender"
                      id="gender-female"
                      onChange={handleChange_genderRadio}
                    />
                    <label htmlFor="gender-female">Female</label>
                    <br />

                    <input
                      type="radio"
                      name="gender"
                      id="gender-male"
                      onChange={handleChange_genderRadio}
                    />
                    <label htmlFor="gender-male">Male</label>
                    <br />

                    <input
                      type="radio"
                      name="gender"
                      id="gender-prefer-none"
                      onChange={handleChange_genderRadio}
                    />
                    <label htmlFor="gender-prefer-none">
                      Prefer not to say
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="gender"
                      id="gender-other"
                      onChange={handleChange_genderRadio}
                      data-value="other"
                    />
                    <label htmlFor="gender-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="gender"
                        onChange={handleChange_genderOther}
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
                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-AIAN"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-AIAN">
                      American Indian or Alaska Native
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-AA"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-AA">
                      Black or African American
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-EA"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-EA">East Asian</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-Latino"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-Latino">Hispanic or Latino</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-ME"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-ME">Middle Eastern</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-Hawaii"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-Hawaii">
                      Native Hawaiian or Other Pacific Islander
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-SA"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-SA">South Asian</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-SEA"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-SEA">Southeast Asian</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-white"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-white">White</label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-prefer-none"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-prefer-none">
                      Prefer not to say
                    </label>
                    <br />

                    <input
                      type="radio"
                      name="ethnicity"
                      id="ethnicity-other"
                      data-value="other"
                      onChange={handleChange_ethnicityRadio}
                    />
                    <label htmlFor="ethnicity-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="ethnicity"
                        onChange={handleChange_ethnicityOther}
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
                    <input
                      type="radio"
                      name="location"
                      id="location-IS"
                      onChange={handleChange_location}
                    />
                    <label htmlFor="location-IS">In-state</label>
                    <br />

                    <input
                      type="radio"
                      name="location"
                      id="location-OOS"
                      onChange={handleChange_location}
                    />
                    <label htmlFor="location-OOS">Out-of-state</label>
                    <br />

                    <input
                      type="radio"
                      name="location"
                      id="location-International"
                      onChange={handleChange_location}
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
                      onChange={handleChange_experience}
                    />
                    <label htmlFor="experience-none">No experience</label>
                    <br />

                    <input
                      type="radio"
                      name="experience"
                      id="experience-beginner"
                      onChange={handleChange_experience}
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
                      onChange={handleChange_experience}
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
                      onChange={handleChange_experience}
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
                      onChange={handleChange_experience}
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
                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-CS"
                      onChange={handleChange_interestsCheckbox}
                    />
                    <label htmlFor="interests-CS">
                      Computer Science/Programming
                    </label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-DA"
                      onChange={handleChange_interestsCheckbox}
                    />
                    <label htmlFor="interests-DA">Data Analysis</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-DV"
                      onChange={handleChange_interestsCheckbox}
                    />
                    <label htmlFor="interests-DV">Data Visualization</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-ML"
                      onChange={handleChange_interestsCheckbox}
                    />
                    <label htmlFor="interests-ML">Machine Learning</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-Stats"
                      onChange={handleChange_interestsCheckbox}
                    />
                    <label htmlFor="interests-Stats">Statistics</label>
                    <br />

                    <input
                      type="checkbox"
                      name="interests"
                      id="interests-other"
                      onChange={handleChange_interestsOtherCheckbox}
                    />
                    <label htmlFor="interests-other">
                      Other:{" "}
                      <input
                        className={styles.InlineInput}
                        type={"text"}
                        placeholder=" "
                        autoComplete="interests"
                        onChange={handleChange_interestsOtherInput}
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
                </FlexColumn>
              </form>
            )}
          </div>
        </FlexRow>
      </div>
    );
  } else if (emailVerified && screen === 1) {
    //---------------------------- screen 1 ----------------------------
    return (
      <div className={styles.Register} data-testid="Register">
        <FlexRow spacing="center" align="center" height="100vh" padding="1em">
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <form onSubmit={handleFormSubmitEmail}>
              <FlexColumn width="100%">
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
