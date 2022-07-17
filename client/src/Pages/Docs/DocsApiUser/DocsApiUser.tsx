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
import Tag, { Color, TagPreset } from "../../../components/Docs/Tag/Tag";
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
    {
      user_id: 2,
      email: "rambergerjohn2@gmail.com",
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

const user_login_0 = {
  ok: 0,
  error: "Invalid login credentials.",
};

const user_login_1 = {
  ok: 1,
  session_key:
    "e8f9407a21b31bb2684cf6e63908d5e331d4af9228bcab4550429df98de855ce",
};

const user_register_input = {
  email: "something@email.com",
  password: "password123",
  fname: "John",
  lname: "Ramberger",
};

const DocsApiUser: FC<DocsApiUserProps> = () => (
  <div className={styles.DocsApiUser} data-testid="DocsApiUser">
    <DocsContentSection>
      <Header id="0">/api/user</Header>
      <MiniText>This is the starting point for all user API requests.</MiniText>

      <MiniHeader id="user">/api/user</MiniHeader>
      <Tag preset={TagPreset.Auth} />
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/user
      </RequestLink>
      <MiniText>
        This request serves as an control to make sure you are on the right url.
        Unlike the control with /api, this request requires authorization. The
        result should look like:
      </MiniText>
      <TextBlock>welcome to the user api!</TextBlock>

      <MiniHeader id="get">/api/user/get</MiniHeader>
      <Tag preset={TagPreset.Auth} />
      <Tag preset={TagPreset.Output} />
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
      <Tag preset={TagPreset.Auth} />
      <Tag preset={TagPreset.Input} />
      <Tag preset={TagPreset.Output} />
      <RequestLink requestType={RequestType.POST}>
        {baseUrl}/api/user/login
      </RequestLink>
      <MiniText>
        This request attempts to login a user. Input parameters:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter
            id="email1"
            type="string"
            optional={false}
            desc="the user's email"
          >
            email
          </Parameter>
          <Parameter
            id="password1"
            type="string"
            optional={false}
            desc="the user's password"
          >
            password
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_login_input} input sticky nomargin />
      </FlexRow>
      <MiniText>
        The most common error is when the email or password combo is incorrect:
      </MiniText>
      <JsonBlock jsonData={user_login_0} success={false} nomargin />
      <MiniText>
        If the email and password combo exist, then the response will look like:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter
            id="session_key"
            type="string"
            desc="the session key that allows a user to stay logged in"
          >
            session_key
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_login_1} success sticky nomargin />
      </FlexRow>

      <MiniHeader id="register">/api/user/register</MiniHeader>
      <Tag preset={TagPreset.Auth} />
      <Tag preset={TagPreset.Input} />
      <Tag preset={TagPreset.Output} />
      <RequestLink requestType={RequestType.POST}>
        {baseUrl}/api/user/login
      </RequestLink>
      <MiniText>
        This request attempts to register a user. Input parameters:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter
            id="email2"
            type="string"
            optional={false}
            desc="the user's email"
          >
            email
          </Parameter>
          <Parameter
            id="password2"
            type="string"
            optional={false}
            desc="the user's password"
          >
            password
          </Parameter>
          <Parameter
            id="fname2"
            type="string"
            optional={false}
            desc="the user's first name"
          >
            fname
          </Parameter>
          <Parameter
            id="lname2"
            type="string"
            optional={false}
            desc="the user's last name"
          >
            lname
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_register_input} input sticky nomargin />
      </FlexRow>
      <MiniText>
        If the email is unique and all other parameters are valid, then the
        response will look like:
      </MiniText>
      <FlexRow spacing="space-between" gap={20}>
        <FlexColumn>
          <Parameter
            id="session_key"
            type="string"
            desc="the session key that allows a user to stay logged in"
          >
            session_key
          </Parameter>
        </FlexColumn>
        <JsonBlock jsonData={user_login_1} success sticky nomargin />
      </FlexRow>
    </DocsContentSection>
  </div>
);

export default DocsApiUser;
