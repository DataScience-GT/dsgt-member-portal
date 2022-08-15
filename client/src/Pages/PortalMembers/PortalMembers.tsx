import React, { FC, useDebugValue, useEffect, useState } from "react";
import MemberActionMenu from "../../components/MemberActionMenu/MemberActionMenu";
import styles from "./PortalMembers.module.scss";

//import icons
import user_icon from "../../assets/icons/user.svg";
import email_icon from "../../assets/icons/at.svg";
import dice_icon from "../../assets/icons/dice-d20.svg";
import shield_icon from "../../assets/icons/shield-check.svg";
import list_icon from "../../assets/icons/list.svg";

import sort_up from "../../assets/icons/sort-amount-up.svg";
import sort_down from "../../assets/icons/sort-amount-down.svg";

import Modal, { ModalPreset } from "../../components/Modal/Modal";
import ErrorText from "../../components/ErrorText/ErrorText";

interface PortalMembersProps {}

type member = {
  fname: string;
  lname: string;
  email: string;
  role: string;
  enabled: boolean;
};

type Sort = {
  column: string;
  order: string;
};

const PortalMembers: FC<PortalMembersProps> = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    user_id: -1,
    email: "",
    fname: "",
    lname: "",
    role: "",
  });
  const [enable, setEnable] = useState(false);

  // let saved_sort = localStorage.getItem("dsgt-portal-member-sorts");
  // const [currentSort, setCurrentSort] = useState(
  //   saved_sort ? JSON.parse(saved_sort) : [{ column: "", order: "" }]
  // );
  const [currentSort, setCurrentSort] = useState(
    localStorage.getItem("dsgt-portal-member-sort") || "fname"
  );
  // const [currentOrder, setCurrentOrder] = useState(
  //   currentSort[0].order == "asc" || false
  // );
  let savedOrder = localStorage.getItem("dsgt-portal-member-sort-order");
  const [currentOrder, setCurrentOrder] = useState<boolean>(
    savedOrder ? savedOrder === "true" : false
  );

  const handleEnableDisable = (
    user_id: number,
    userEmail: string,
    fname: string,
    lname: string,
    role: string,
    enable: boolean
  ) => {
    // console.log(userEmail, enable);
    setCurrentUser({
      user_id: user_id,
      email: userEmail,
      fname: fname,
      lname: lname,
      role: role,
    });
    setEnable(enable);
    setShowDisableModal(true);
  };

  const handleDisableConfirmed = async () => {
    await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        session_id: localStorage.getItem("dsgt-portal-session-key"),
        user_email: currentUser.email,
        user_enabled: enable,
      }),
    }).then(async (res) => {
      const json = await res.json();
      if (!json.ok && json.error) {
        setError(json.error);
        console.log(json.error);
      } else {
        //user successfully enabled/disabled
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    //get members from db
    const callDB = async () => {
      await fetch("/api/user/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({
          session_id: localStorage.getItem("dsgt-portal-session-key"),
        }),
      }).then(async (res) => {
        const json = await res.json();
        if (!json.ok && json.error) {
          setError(json.error);
          console.log(json.error);
        } else {
          if (currentSort) {
            sortMembers(currentSort, currentOrder || false, json.data);
          } else {
            setMembers(json.data);
          }
          // console.log(json.data);
          setLoading(false);
        }
      });
    };
    callDB();
  }, []);

  // --------------- handle sorting of table ---------------
  const handleSort = (e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    let newSort = e.currentTarget.getAttribute("data-sort-type");
    if (!newSort) {
      return;
    }
    let newOrder = currentOrder;
    if (newSort === currentSort) {
      //change order
      newOrder = !currentOrder;
      setCurrentOrder(newOrder);
    } else if (newSort) {
      setCurrentSort(newSort);
    }
    sortMembers(newSort, newOrder);
  };

  const sortMembers = (sort: string, order: boolean, memberList?: []): void => {
    let mems = members;
    if (memberList) {
      mems = memberList;
    }
    mems.sort((a, b) => {
      if (a[sort] > b[sort]) {
        return order ? 1 : -1;
      } else if (a[sort] < b[sort]) {
        return order ? -1 : 1;
      }
      return 0;
    });
    setMembers(mems);
  };

  useEffect(() => {
    // console.log(currentSort, currentOrder);
    if (currentSort) {
      localStorage.setItem("dsgt-portal-member-sort", currentSort);
    }
    if (currentOrder !== undefined) {
      localStorage.setItem(
        "dsgt-portal-member-sort-order",
        currentOrder.toString()
      );
    }
  }, [currentSort, currentOrder]);

  return (
    <div className={styles.PortalMembers} data-testid="PortalMembers">
      <ErrorText>{error}</ErrorText>
      {loading ? (
        <div>loading...</div>
      ) : (
        <table className={styles.Table}>
          <thead>
            <tr>
              <th onClick={handleSort} data-sort-type="fname">
                <img src={user_icon} alt="User Icon" />
                Full Name
                {currentSort.includes("name") ? (
                  currentOrder ? (
                    <img
                      className={styles.SortIcon}
                      src={sort_up}
                      alt="Sort Icon"
                    />
                  ) : (
                    <img
                      className={styles.SortIcon}
                      src={sort_down}
                      alt="Sort Icon"
                    />
                  )
                ) : (
                  ""
                )}
              </th>
              <th onClick={handleSort} data-sort-type="email">
                <img src={email_icon} alt="Email Icon" />
                Email
                {currentSort === "email" ? (
                  currentOrder ? (
                    <img
                      className={styles.SortIcon}
                      src={sort_up}
                      alt="Sort Icon"
                    />
                  ) : (
                    <img
                      className={styles.SortIcon}
                      src={sort_down}
                      alt="Sort Icon"
                    />
                  )
                ) : (
                  ""
                )}
              </th>
              <th onClick={handleSort} data-sort-type="role">
                <img src={dice_icon} alt="Role Icon" />
                Role
                {currentSort === "role" ? (
                  currentOrder ? (
                    <img
                      className={styles.SortIcon}
                      src={sort_up}
                      alt="Sort Icon"
                    />
                  ) : (
                    <img
                      className={styles.SortIcon}
                      src={sort_down}
                      alt="Sort Icon"
                    />
                  )
                ) : (
                  ""
                )}
              </th>
              <th onClick={handleSort} data-sort-type="enabled">
                <img src={shield_icon} alt="Enabled Icon" />
                Enabled
                {currentSort === "enabled" ? (
                  currentOrder ? (
                    <img
                      className={styles.SortIcon}
                      src={sort_up}
                      alt="Sort Icon"
                    />
                  ) : (
                    <img
                      className={styles.SortIcon}
                      src={sort_down}
                      alt="Sort Icon"
                    />
                  )
                ) : (
                  ""
                )}
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
                <tr key={i} data-user-id={member["user_id"]}>
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
                    <MemberActionMenu
                      enabled={member["enabled"]}
                      user_id={member["user_id"]}
                      email={member["email"]}
                      fname={member["fname"]}
                      lname={member["lname"]}
                      role={member["role"]}
                      onEnableDisable={handleEnableDisable}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Modal
        open={showDisableModal}
        setOpen={setShowDisableModal}
        preset={ModalPreset.Confirm}
        handleConfirmed={handleDisableConfirmed}
      >
        Are you sure you would like to {enable ? "enable " : "disable "}
        <span className={styles.ModalHighlight}>
          {currentUser.fname} {currentUser.lname}
        </span>
        's account?
      </Modal>
    </div>
  );
};

export default PortalMembers;
