import React, { FC, useEffect, useState } from "react";
import MemberActionMenu from "../../components/MemberActionMenu/MemberActionMenu";
import styles from "./PortalMembers.module.scss";

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
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Enabled</th>
              <th>Actions</th>
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
                  <td className={styles.Enabled}>
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
