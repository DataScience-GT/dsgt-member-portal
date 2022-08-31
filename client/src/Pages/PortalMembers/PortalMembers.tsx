import React, { FC, useDebugValue, useEffect, useState } from "react";
import MemberActionMenu from "../../components/MemberActionMenu/MemberActionMenu";
import styles from "./PortalMembers.module.scss";

//import icons
import user_icon from "../../assets/icons/user.svg";
import email_icon from "../../assets/icons/at.svg";
import dice_icon from "../../assets/icons/dice-d20.svg";
import shield_icon from "../../assets/icons/shield-check.svg";
import lastonline_icon from "../../assets/icons/alarm-clock.svg";
import list_icon from "../../assets/icons/list.svg";

import sort_up from "../../assets/icons/sort-amount-up.svg";
import sort_down from "../../assets/icons/sort-amount-down.svg";

import Modal, { ModalPreset } from "../../components/Modal/Modal";
import ErrorText from "../../components/ErrorText/ErrorText";
import InputField from "../../components/InputField/InputField";
import { handleChange_input_string } from "../../Scripts/InputHandler";
import SuccessText from "../../components/SuccessText/SuccessText";
import { Role } from "../../Scripts/RoleManagement";
import InputDropdown from "../../components/InputDropdown/InputDropdown";
import FlexRow from "../../layout/FlexRow/FlexRow";
import {
  changeMemberEnableDisable,
  changeMemberRole,
  getMembers,
  result_getMembers,
} from "../../API/Member";

interface PortalMembersProps {}

const PortalMembers: FC<PortalMembersProps> = () => {
  const [allMembers, setAllMembers] = useState<result_getMembers[]>([]);
  const [members, setMembers] = useState<result_getMembers[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    user_id: -1,
    email: "",
    fname: "",
    lname: "",
    role: "",
  });
  const [enable, setEnable] = useState(false);
  const [newRole, setNewRole] = useState<Role>();

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

  const handleDisableConfirmed = async () => {
    await changeMemberEnableDisable(currentUser.email, enable, () => {
      window.location.reload();
    }).catch((err) => {
      setError(err.message);
    });
  };

  useEffect(() => {
    //get members from db
    getMembers((data) => {
      if (currentSort) {
        sortMembers(currentSort, currentOrder || false, data);
      } else {
        setMembers(data);
      }
      setAllMembers(data);
      // console.log(json.data);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
    });
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

  const sortMembers = (
    sort: string,
    order: boolean,
    memberList?: [] | result_getMembers[]
  ): void => {
    let mems = members;
    if (memberList) {
      mems = memberList;
    }
    mems.sort((a, b) => {
      let aVal;
      let bVal;
      switch (sort.toLowerCase()) {
        case "fname":
          aVal = a.fname;
          bVal = b.fname;
          break;
        case "lname":
          aVal = a.lname;
          bVal = b.lname;
          break;
        case "email":
          aVal = a.email;
          bVal = b.email;
          break;
        case "role":
          aVal = a.role;
          bVal = b.role;
          break;
        case "enabled":
          aVal = a.enabled;
          bVal = b.enabled;
          break;
        case "last_logged_on":
          aVal = a.last_logged_on;
          bVal = b.last_logged_on;
          break;
        default:
          aVal = a.fname;
          bVal = b.fname;
      }
      if (aVal && bVal) {
        if (aVal > bVal) {
          return order ? 1 : -1;
        } else if (aVal < bVal) {
          return order ? -1 : 1;
        }
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

  // -------------------- handle searching --------------------
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      let s = search.toLowerCase();
      //try to filter members
      let mems = allMembers.filter((member) =>
        Object.values(member).join(" ").toLowerCase().includes(s)
      );

      //sort the findings
      sortMembers(currentSort, currentOrder, mems);
    } else {
      setMembers(allMembers);
    }
  }, [search]);

  // --------------- update user roles ---------------

  const handleChangeRole = async () => {
    if (newRole)
      await changeMemberRole(currentUser.email, newRole, () => {
        window.location.reload();
      }).catch((err) => {
        setError(err.message);
      });
  };

  const handleGetLastLoggedOn = (member: result_getMembers) => {
    if (!member.last_logged_on) {
      return "never";
    }
    let log = new Date(member.last_logged_on);
    let now = new Date();
    const total_ms = now.getTime() - log.getTime();

    let seconds = Math.floor(total_ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    let str: string[] = [];
    if (days) {
      str.push(`${days} Days`);
    } else if (hours) {
      str.push(`${hours} Hours`);
    } else if (minutes) {
      str.push(`${minutes} Minutes`);
    } else if (seconds) {
      str.push(`${seconds} Seconds`);
    }

    return str.join(", ");
  };

  return (
    <div className={styles.PortalMembers} data-testid="PortalMembers">
      <a
        href={`/api/file/members?session_id=${localStorage.getItem(
          "dsgt-portal-session-key"
        )}`}
        className={styles.Link}
        target="_blank"
        rel="noreferrer"
      >
        Export
      </a>
      <InputField
        type="search"
        placeholder="Search"
        onChange={(e) => {
          handleChange_input_string(e, setSearch);
        }}
      />
      <SuccessText>
        {search.length > 0
          ? `${members.length} result${members.length !== 1 ? "s" : ""} found`
          : ""}
      </SuccessText>
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
              <th onClick={handleSort} data-sort-type="last_logged_on">
                <img src={lastonline_icon} alt="Last Logged On Icon" />
                Last On
                {currentSort === "last_logged_on" ? (
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
                  <td className={`${styles.LastLoggedOn}`}>
                    {handleGetLastLoggedOn(member)}
                  </td>
                  <td className={styles.Actions}>
                    <MemberActionMenu
                      enabled={member.enabled}
                      onAnything={() => {
                        setCurrentUser({
                          user_id: member.user_id,
                          email: member.email,
                          fname: member.fname,
                          lname: member.lname,
                          role: member.role,
                        });
                      }}
                      onEnableDisable={() => {
                        setEnable(!member.enabled);
                        setShowDisableModal(true);
                      }}
                      onChangeRole={() => {
                        setShowChangeRoleModal(true);
                      }}
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
      <Modal
        open={showChangeRoleModal}
        setOpen={setShowChangeRoleModal}
        preset={ModalPreset.Change}
        handleConfirmed={handleChangeRole}
      >
        <p>
          Change{" "}
          <span className={styles.ModalHighlight}>
            {currentUser.fname} {currentUser.lname}
          </span>
          's role:
        </p>
        <FlexRow spacing="center">
          <InputDropdown
            options={Object.values(Role)}
            setState={setNewRole}
            initialValue={currentUser.role}
            hideInitial
          />
        </FlexRow>
      </Modal>
    </div>
  );
};

export default PortalMembers;
