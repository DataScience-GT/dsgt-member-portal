import React, { FC } from "react";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import Header from "../../../components/Docs/Header/Header";
import JsonBlock from "../../../components/Docs/JsonBlock/JsonBlock";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import MiniText from "../../../components/Docs/MiniText/MiniText";
import Parameter from "../../../components/Docs/Parameter/Parameter";
import RequestLink, {
  RequestType,
} from "../../../components/Docs/RequestLink/RequestLink";
import TextBlock from "../../../components/Docs/TextBlock/TextBlock";
import FlexColumn from "../../../layout/FlexColumn/FlexColumn";
import FlexRow from "../../../layout/FlexRow/FlexRow";
import styles from "./DocsApiUser.module.scss";

interface DocsApiUserProps {}

const baseUrl = window.location.href.split("//")[1].split("/")[0];

const user_get_1 = {
  ok: 1,
  data: [
    {
      user_inc: 1,
      email: "rambergerjohn@gmail.com",
      fname: "john",
      lname: "ramberger",
      password: "202cb962ac59075b964b07152d234b70",
      created_at: "2022-07-16T19:48:41.592Z",
      enabled: true,
    },
  ],
};

const DocsApiUser: FC<DocsApiUserProps> = () => (
  <div className={styles.DocsApiUser} data-testid="DocsApiUser">
    <DocsContentSection>
      <Header id="0">/api/user</Header>
      <MiniText>This is the starting point for all user API requests.</MiniText>
      <MiniHeader id="user">/api/user</MiniHeader>
      <TextBlock>Requires Authorization</TextBlock>
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/user
      </RequestLink>
      <MiniText>
        This request serves as an control to make sure you are on the right url.
        Unlike the control with /api, this request requires authorization.
      </MiniText>
      <TextBlock>welcome to the user api!</TextBlock>
      <MiniHeader id="get">/api/user/get</MiniHeader>
      <TextBlock>Requires Authorization</TextBlock>
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/user/get
      </RequestLink>
      <MiniText>
        This request returns a list of all of the users in the database. Results
        will be in the form of:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn padding="10px 0 0 0">
          <Parameter id="data" type="Array[User]" desc="array of users">
            data
          </Parameter>
          <Parameter
            id="user_inc"
            type="Number"
            desc="the user's identification number"
          >
            user_inc
          </Parameter>
          <Parameter id="email" type="String" desc="the user's email">
            email
          </Parameter>
          <Parameter id="fname" type="String" desc="the user's first name">
            fname
          </Parameter>
          <Parameter id="lname" type="String" desc="the user's last name">
            lname
          </Parameter>
          <Parameter
            id="created_at"
            type="Date"
            desc="the user's account creation date"
          >
            created_at
          </Parameter>
          <Parameter
            id="enabled"
            type="Boolean"
            desc="whether the user's account is enabled"
          >
            enabled
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_get_1} success={true} />
      </FlexRow>
    </DocsContentSection>
  </div>
);

export default DocsApiUser;
