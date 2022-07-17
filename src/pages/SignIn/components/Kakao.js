import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router";

const Kakao = () => {
  const [tokenData, setTokenData] = useState("");

  const REST_API_KEY = "c4407d02c453315320fe564405160e2e";
  const REDIRECT_URI = "https://www.coinfortal.com/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;
  const CLIENT_SECRET = "JG5vGorIX2Bga6hS7UlXTMtV45Z7ZG8g";

  let navigate = useNavigate();

  const url = new URL(window.location.href);
  let authorizationCode= "";

  const kakaoLoginHandler = () => {
    /*window.location.assign(KAKAO_AUTH_URL).then((res)=>{
      console.log(res);
    }
    )*/
    axios.get(
      '/api/tokakao'
      , {
       headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
  }).then((result)=>{
      console.log(result)
      // 토큰을 활용한 로직을 적어주면된다.

  }).catch(e=> {
      console.log(e)
  })

  };

 /* useEffect(()=>{
    authorizationCode = url.searchParams.get("code");

    if( authorizationCode != null){
      console.log(authorizationCode);
      
      try{
        axios.get(
            ''
            , {
             headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then((result)=>{
            console.log(result.data['access_token'])
            // 토큰을 활용한 로직을 적어주면된다.

        }).catch(e=> {
            console.log(e)
        })
      }catch(e){
          console.log(e)
      }
    }else{ 
      console.log('못받음')
      return 0;
    }
  },[])

  /*useEffect(()=>{
    console.log('시작')
    axios.get('/api/login',
    {
      params :{"code": authorizationCode}
    }).then((res) => {
      console.log('성공');
      
    }).catch((error) => {
      console.log(error.response.data);
    })
  }, authorizationCode)

  /*const getToken = async () => {

    try {
      // access token 가져오기
      axios.get('/api/login', null,
      {
        params :{code: authorizationCode}
      }).then((res) => {
        const url1 = new URL(window.location.href);
        const jwt = url.searchParams.get("jwt");
        console.log(jwt);
        
      }).catch((error) => {
        console.log(error.response.data);
      })

        // 마이페이지으로 이동
        //navigate("/");
    } catch (err) {
      console.log(err);
    } 
  };
  

  useEffect(() => {
    getToken();
  }, []);*/
  
  return (
    <div className="login__kakao" style={{ width:"70%", marginTop: "100px"}}>
      <a id="custom-login-btn" href={KAKAO_AUTH_URL}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="100%"
        />
      </a>
    </div>
  );
};

export default Kakao;
