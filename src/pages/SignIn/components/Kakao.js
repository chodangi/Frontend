import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router";

const Kakao = () => {
  const [tokenData, setTokenData] = useState("");

  const REST_API_KEY = "c4407d02c453315320fe564405160e2e";
  const REDIRECT_URI = "http://13.209.180.179:8080/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET = "JG5vGorIX2Bga6hS7UlXTMtV45Z7ZG8g";

  let navigate = useNavigate();

  const kakaoLoginHandler = () => {
    window.location.assign(KAKAO_AUTH_URL);
    /*axios.get('/api/community/posts', { 
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error.response.data);
    })*/
  };

  /*const getToken = async () => {

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: authorizationCode,
      client_secret: CLIENT_SECRET,
    });

    const payload = qs.stringify({
      code: authorizationCode
    });

    const re = "";

    try {
      // access token 가져오기
      axios.get('/api/login', {
        params: {
          code: authorizationCode,
        }, 
      }).then((res) => {
        console.log(res);

        const url1 = new URL(window.location.href);
        const jwt = url1.searchParams.get("jwt");
        console.log(jwt);
      }).catch((error) => {
        console.log(error.response.data);
      })

        // Kakao Javascript SDK 초기화
        window.Kakao.init(REST_API_KEY);
        // access token 설정
        window.Kakao.Auth.setAccessToken(res.data.access_token);
        // 마이페이지으로 이동
        //navigate("/");
    } catch (err) {
      console.log(err);
    } 
  };*/
  

  /*useEffect(() => {
    getToken();
  }, []);*/
  
  return (
    <div className="login__kakao">
      <a id="custom-login-btn" onClick={kakaoLoginHandler}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
        />
        <div >10000</div>
      </a>
    </div>
  );
};

export default Kakao;
