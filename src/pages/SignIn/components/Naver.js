import { useState, useEffect } from "react";
import qs from "qs";
import naver from "./naver.png";

const Naver = () => {
  const [tokenData, setTokenData] = useState("");
  const passwordChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
  const state = Array.from(crypto.getRandomValues(new Uint32Array(15)))
    .map((x) => passwordChars[x % passwordChars.length])
    .join("");

  const naverapi =
    `https://nid.naver.com/oauth2.0/authorize?` +
    `response_type=code` +
    `&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}` +
    `&state=${state}` +
    `&redirect_uri=http://localhost:3000/oauth/naver`;
  const naverLoginHandler = () => {
    window.location.assign(naverapi);
  };

  useEffect(async () => {
    const url = new URL(window.location.href);

    const authorizationCode = url.searchParams.get("code");
    const authorizationState = url.searchParams.get("state");

    const data = {
      grant_type: "authorization_code",
      client_id: `${process.env.REACT_APP_NAVER_CLIENT_ID}`,
      redirect_uri: "http://localhost:3000/oauth/naver",
      client_secret: `${process.env.REACT_APP_KAKAO_CLIENT_SECRET}`,
      code: authorizationCode,
      state: authorizationState,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "https://nid.naver.com/oauth2.0/token",
    };
    setTokenData(options);
  }, []);

  return (
    <div className="login__naver">
      <a id="custom-login-btn" onClick={naverLoginHandler}>
        <img src={naver} width="222" />
      </a>
    </div>
  );
};

export default Naver;
