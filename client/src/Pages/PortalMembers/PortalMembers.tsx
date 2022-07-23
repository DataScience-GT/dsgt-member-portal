import React, { FC, useEffect, useState } from "react";
import MemberActionMenu from "../../components/MemberActionMenu/MemberActionMenu";
import styles from "./PortalMembers.module.scss";

//import icons
import user_icon from "../../assets/icons/user.svg";
import email_icon from "../../assets/icons/at.svg";
import dice_icon from "../../assets/icons/dice-d20.svg";
import shield_icon from "../../assets/icons/shield-check.svg";
import list_icon from "../../assets/icons/list.svg";

interface PortalMembersProps {}

type member = {
  fname: string;
  lname: string;
  email: string;
  role: string;
  enabled: boolean;
};

const PortalMembers: FC<PortalMembersProps> = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //get members from db
    const callDB = async () => {
      await fetch("/api/user/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          setError(json.error);
          console.log(json.error);
        } else {
          setMembers(json.data);
          console.log(json.data);
          setLoading(false);
        }
      });
    };
    callDB();
  }, []);
  return (
    <div className={styles.PortalMembers} data-testid="PortalMembers">
      {loading ? (
        <div>loading...</div>
      ) : (
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>
                <img src={user_icon} alt="User Icon" />
                Full Name
              </th>
              <th>
                <img src={email_icon} alt="Email Icon" />
                Email
              </th>
              <th>
                <img src={dice_icon} alt="Role Icon" />
                Role
              </th>
              <th>
                <img src={shield_icon} alt="Enabled Icon" />
                Enabled
              </th>
              <th>
                <img src={list_icon} alt="Actions Icon" />
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, i) => {
              return (
                <tr key={i}>
                  <td className={styles.Name}>
                    {member["fname"]} {member["lname"]}
                  </td>
                  <td className={styles.Email}>{member["email"]}</td>
                  <td className={styles.Role}>{member["role"]}</td>
                  <td
                    className={`${styles.Enabled} ${
                      member["enabled"] ? styles._Enabled : styles._Disabled
                    }`}
                  >
                    {member["enabled"] ? "yes" : "no"}
                  </td>
                  <td className={styles.Actions}>
                    <MemberActionMenu />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PortalMembers;
