import styled from "styled-components";

import History from "./components/History";
import Profile from "./components/Profile";
import MyCommunity from "./components/MyCommunity";
import { size } from "../../styles/Theme";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../../api/api";

const MyPage = (props) => {
  useEffect(()=>{
    api.get('profile/my-settings').then(res=>{
      if(res.errorCode){
        localStorage.removeItem('user');
        nav('/');
      }
    })
  },[])

  const nav = useNavigate();
  const signOut = () => {
    localStorage.removeItem('user');
    nav('/');
  };

  return (
    <MyPageDiv>
      <h1 className="mypage__header">내 정보</h1>
      <ProfileMainDiv>
        <Profile />
        <hr />
        <History />
      </ProfileMainDiv>
      {/* <MyCommunity theme={props.theme} /> */}
      <SettingBtn onClick={() => (window.location.href = "/settings")}>
        설정
      </SettingBtn>
      <SignOutBtn onClick={signOut}>
      SignOut
      </SignOutBtn>
    </MyPageDiv>
  );
};

export default MyPage;

const SignOutBtn = styled.div`
  background-color: ${(props) => props.theme.colors.gray__2};
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: ${size.font_mid};
  margin: 0 auto;
  padding: 0.5rem;
  width: 90%;
`

const MyPageDiv = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
  width: 100vw;

  .btn__below {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${size.font_mid};
    margin-top: 2rem;
    padding: 0.5rem 0;
    width: 80%;
  }
`;

const ProfileMainDiv = styled.div`
  hr {
    border: none;
    border-top: ${(props) => `2px solid ${props.theme.colors.gray__2}`};
  }
`;

const SettingBtn = styled.button`
  background-color: ${(props) => props.theme.colors.gray__2};
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: ${size.font_mid};
  margin: 2rem auto 1rem auto;
  padding: 0.5rem;
  width: 90%;
`;
