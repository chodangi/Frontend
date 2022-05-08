import styled from "styled-components";

import History from "./components/History";
import Profile from "./components/Profile";
import MyCommunity from "./components/MyCommunity";
import { size } from "../../styles/Theme";
import { useNavigate } from "react-router";

const MyPage = (props) => {
  const nav = useNavigate();
  const signOut = () => {
    localStorage.removeItem('user')
    nav('/')
  };

  return (
    <MyPageDiv>
      <h1 className="mypage__header">내 정보</h1>
      <ProfileMainDiv>
        <Profile />
        <hr />
        <History />
      </ProfileMainDiv>
      <MyCommunity theme={props.theme} />
      <SettingBtn onClick={() => (window.location.href = "/settings")}>
        설정
      </SettingBtn>
      <div onClick={signOut}>SignOut</div>
    </MyPageDiv>
  );
};

export default MyPage;

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
  margin: 2rem auto;
  padding: 0.5rem;
  width: 90%;
`;
