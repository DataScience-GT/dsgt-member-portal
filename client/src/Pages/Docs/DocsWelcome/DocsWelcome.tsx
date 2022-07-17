import React, { FC } from "react";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import styles from "./DocsWelcome.module.scss";

import Header from "../../../components/Docs/Header/Header";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import JsonBlock from "../../../components/Docs/JsonBlock/JsonBlock";
import MiniText from "../../../components/Docs/MiniText/MiniText";
import Divider from "../../../components/Docs/Divider/Divider";

interface DocsWelcomeProps {}

const DocsWelcome: FC<DocsWelcomeProps> = () => (
  <div className={styles.DocsWelcome} data-testid="DocsWelcome">
    <DocsContentSection>
      <Header id="0" hash="#0">
        Welcome
      </Header>
      <MiniHeader id="introduction">Introduction</MiniHeader>
      <MiniText>
        Welcome to the api docs for the DSGT membership portal. This api allows
        you to access and modify the membership portal in a variety of ways. The
        primary purpose for this api is to be used with a static site served
        through the express server that is running the api, but it can also be
        used on another site if needed.
      </MiniText>
      <MiniHeader id="api-info">API Info</MiniHeader>
      <MiniText>
        This API is hosted using an HTTP server, so any communication with the
        API must be done in the form of an http request. In order to prevent
        unwanted outside interference, you must authenticate your request using
        basic authentication (See <a href="#authentication">Authentication</a>{" "}
        for more details)
      </MiniText>
      <MiniHeader id="api-stack">API Stack</MiniHeader>
      <MiniText>
        The API uses Express.js to handle all http requests. To store data, the
        API is using postres with Knex in order to work on a heroku server. The
        actual portal (where these docs are) is served through express as a
        built React app using React-Router
      </MiniText>
      <MiniHeader id="authentication">Authentication</MiniHeader>
      <MiniText>
        Authentication for the API uses basic authorization to verify the http
        request being made (see{" "}
        <a
          href="https://en.wikipedia.org/wiki/Basic_access_authentication"
          target="_blank"
        >
          here
        </a>{" "}
        for more details). The Authorization username and password are stored in
        the environmental variables (found on the hosting provider - Heroku as
        of 2022). Authorization for the API is implemented using a middleware
        function on /routes/api, which can be removed to allow anyone to make
        requests (this is a security issue, but can be tested during
        development).
      </MiniText>
      <MiniHeader id="credits">Credits</MiniHeader>
      <MiniText>
        This API was created by{" "}
        <a href="https://github.com/JohnRamberger" target="_blank">
          John Ramberger
        </a>{" "}
        for{" "}
        <a href="https://datasciencegt.org" target="_blank">
          Data Science @ Georgia Tech
        </a>
        , and is maintained by the DSGT Tech Team.
      </MiniText>
    </DocsContentSection>
  </div>
);

export default DocsWelcome;
