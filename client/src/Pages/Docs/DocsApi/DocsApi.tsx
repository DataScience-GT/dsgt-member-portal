import React, { FC } from "react";
import Divider from "../../../components/Docs/Divider/Divider";
import DocsContentSection from "../../../components/Docs/DocsContentSection/DocsContentSection";
import Header from "../../../components/Docs/Header/Header";
import InlineTextBlock from "../../../components/Docs/InlineTextBlock/InlineTextBlock";
import JsonBlock from "../../../components/Docs/JsonBlock/JsonBlock";
import MiniHeader from "../../../components/Docs/MiniHeader/MiniHeader";
import MiniText from "../../../components/Docs/MiniText/MiniText";
import RequestLink, {
  RequestType,
} from "../../../components/Docs/RequestLink/RequestLink";
import Tag, { TagPreset } from "../../../components/Docs/Tag/Tag";
import TextBlock from "../../../components/Docs/TextBlock/TextBlock";
import FlexRow from "../../../layout/FlexRow/FlexRow";
import styles from "./DocsApi.module.scss";

interface DocsApiProps {}

const baseUrl = window.location.href.split("//")[1].split("/")[0];

const auth_result_0 = { ok: 0, error: "missing authorization header" };
const auth_result_0_5 = { ok: 0, error: "invalid basic authorization" };
const auth_result_1 = { ok: 1 };

const DocsApi: FC<DocsApiProps> = () => (
  <div className={styles.DocsApi} data-testid="DocsApi">
    <DocsContentSection>
      <MiniText>
        <a href="/docs/welcome">← Return to previous section</a>
      </MiniText>
      <Divider />
      <Header id="0">/api</Header>
      <MiniText>
        This is the starting point for all API requests. The two requests below
        serve as an example and test to make sure your systems are working.
      </MiniText>
      <MiniHeader id="api">/api/</MiniHeader>
      <RequestLink requestType={RequestType.GET}>{baseUrl}/api</RequestLink>
      <MiniText>
        This request serves as an control to make sure you are on the right url.
        Because it is a GET request, it can be accessed in your browser. This
        request also does not require authorization, so anyone can access it.
        Simply going to the correct url should give the response:
      </MiniText>
      <TextBlock>welcome to the api!</TextBlock>
      <MiniHeader id="auth">/api/auth</MiniHeader>
      <Tag preset={TagPreset.Auth} />
      <RequestLink requestType={RequestType.GET}>
        {baseUrl}/api/auth
      </RequestLink>
      <MiniText>
        This request allows you to check whether your authorization is correct,
        before completing other, more complicated, requests. These are the
        possible responses:
      </MiniText>
      <FlexRow gap="20px">
        <JsonBlock jsonData={auth_result_0} success={false} />
        <JsonBlock jsonData={auth_result_0_5} success={false} />
        <JsonBlock jsonData={auth_result_1} success={true} />
      </FlexRow>
      <MiniText>
        All responses will be in the same format in the future, with
        <InlineTextBlock>"ok": 0</InlineTextBlock>
        being an error and <InlineTextBlock>"ok": 1</InlineTextBlock> being a
        success.
      </MiniText>
      <Divider />
      <MiniText>
        <a href="/docs/api/user">Continue to next section →</a>
      </MiniText>
    </DocsContentSection>
  </div>
);

export default DocsApi;
