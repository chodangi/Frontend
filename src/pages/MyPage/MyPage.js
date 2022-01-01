import styled from "styled-components";
import { useState } from "react";

import History from "./components/History";
import Profile from "./components/Profile";
import MyCommunity from "./components/MyCommunity";
import DeleteAccountModal from "./components/DeleteAccountModal";
import Settings from "./components/Settings";
import { size } from "../../styles/Theme";

const MyPage = (props) => {
  const [deleteAccountModalVisibility, setDeleteAccountModalVisibility] =
    useState(false);

  const modalVisibilityHandler = (e) => {
    console.log(deleteAccountModalVisibility);
    setDeleteAccountModalVisibility(!deleteAccountModalVisibility);

    e.preventDefault();
  };

  console.log(deleteAccountModalVisibility);

  return (
    <MyPageDiv>
      <h1 className="mypage__header">내 정보</h1>
      <ProfileMainDiv>
        <Profile />
        <hr />
        <History />
      </ProfileMainDiv>
      <MyCommunity theme={props.theme} />
      <Settings theme={props.theme} darkModeHandler={props.darkModeHandler} />
      {/* 
      <button
        className="btn__below logout"
        // onClick={}
      >
        로그아웃
      </button>
      <button
        className="btn__below deleteAccount"
        onClick={modalVisibilityHandler}
      >
        회원 탈퇴
      </button>
      {deleteAccountModalVisibility && (
        <DeleteAccountModal
          visible={deleteAccountModalVisibility}
          theme={props.theme}
          visiblityHandler={modalVisibilityHandler}
        />
      )}
      */}
    </MyPageDiv>
  );
};

export default MyPage;

const MyPageDiv = styled.div`
  margin: auto;
  text-align: center;

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
  max-width: 600px;
  width: 100vw;

  hr {
    border: none;
    border-top: ${(props) => `2px solid ${props.theme.colors.gray__2}`};
  }
`;
