import { useState, useEffect } from "react";
import qs from "qs";

const Kakao = () => {
  const [tokenData, setTokenData] = useState("");
  const kakaoApi =
    `https://kauth.kakao.com/oauth/authorize?` +
    `response_type=code` +
    `&client_id=${process.env.REACT_APP_KAKAO_JS_KEY}` +
    `&redirect_uri=http://localhost:3000/oauth`;

  const kakaoLoginHandler = () => {
    window.location.assign(kakaoApi);
  };

  useEffect(async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    const data = {
      grant_type: "authorization_code",
      client_id: `${process.env.REACT_APP_KAKAO_REST_KEY}`,
      redirect_uri: "http://localhost:3000/oauth",
      code: authorizationCode,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "https://kauth.kakao.com/oauth/token",
    };
    setTokenData(options);
  }, []);

  return (
    <div className="login__kakao">
      <a id="custom-login-btn" onClick={kakaoLoginHandler}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
        />
      </a>
    </div>
  );
};

export default Kakao;
