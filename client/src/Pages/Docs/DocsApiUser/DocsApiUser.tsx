import React, { FC } from "react";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import Header from "../../../components/Docs/Header/Header";
import InlineTextBlock from "../../../components/Docs/InlineTextBlock/InlineTextBlock";
import JsonBlock from "../../../components/Docs/JsonBlock/JsonBlock";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import MiniText from "../../../components/Docs/MiniText/MiniText";
import Parameter from "../../../components/Docs/Parameter/Parameter";
import RequestLink, {
  RequestType,
} from "../../../components/Docs/RequestLink/RequestLink";
import Tag, { Color } from "../../../components/Docs/Tag/Tag";
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
      user_id: 1,
      email: "rambergerjohn@gmail.com",
      fname: "john",
      lname: "ramberger",
      enabled: true,
      created_at: "2022-07-16T19:48:41.592Z",
    },
  ],
};

const user_login_input = {
  email: "something@email.com",
  password: "password123",
};

const DocsApiUser: FC<DocsApiUserProps> = () => (
  <div className={styles.DocsApiUser} data-testid="DocsApiUser">
    <DocsContentSection>
      <Header id="0">/api/user</Header>
      <MiniText>This is the starting point for all user API requests.</MiniText>

      <MiniHeader id="user">/api/user</MiniHeader>
      <Tag color={Color.Blue}>Requires Authorization</Tag>
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/user
      </RequestLink>
      <MiniText>
        This request serves as an control to make sure you are on the right url.
        Unlike the control with /api, this request requires authorization.
      </MiniText>
      <TextBlock>welcome to the user api!</TextBlock>

      <MiniHeader id="get">/api/user/get</MiniHeader>
      <Tag color={Color.Blue}>Requires Authorization</Tag>
      <Tag color={Color.Green}>Returns Data</Tag>
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/user/get
      </RequestLink>
      <MiniText>
        This request returns a list of all of the users in the database. Results
        will be in the form of:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter id="data" type="Array[User]" desc="array of users">
            data
          </Parameter>
          <Parameter
            id="user_id"
            type="Number"
            desc="the user's identification number"
          >
            user_id
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
            id="enabled"
            type="Boolean"
            desc="whether the user's account is enabled"
          >
            enabled
          </Parameter>
          <Parameter
            id="created_at"
            type="Date"
            desc="the user's account creation date"
          >
            created_at
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_get_1} success={true} sticky nomargin />
      </FlexRow>

      <MiniHeader id="login">/api/user/login</MiniHeader>

      <Tag color={Color.Blue}>Requires Authorization</Tag>
      <Tag color={Color.Gray}>Requires Input Data</Tag>
      <Tag color={Color.Green}>Returns Data</Tag>
      <RequestLink requestType={RequestType.POST}>
        {baseUrl}/api/user/login
      </RequestLink>
      <MiniText>
        This request attempts to login a user. Input parameters:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter id="email1" type="string" desc="the user's email">
            email
          </Parameter>
          <Parameter id="password1" type="string" desc="the user's password">
            password
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_login_input} input sticky nomargin />
      </FlexRow>
      <MiniText>The </MiniText>
    </DocsContentSection>
  </div>
);

export default DocsApiUser;
