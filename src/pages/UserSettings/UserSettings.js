import styled from "styled-components";
import { useState, useEffect, useReducer } from "react";

import SettingNickname from "./components/SettingNickname";
import NotificationSettings from "./components/NotificationSettings";
import DeleteAccountModal from "./components/DeleteAccountModal";
import { size } from "../../styles/Theme";

const MyPage = (props) => {
  // const [notifications, setNotifications] = useReducer(
  //   (state, updates) => ({ ...state, ...updates }),
  //   {
  //     community: {
  //       like: true,
  //       comment: false,
  //     },
  //     guessing: {
  //       beforeEnd: true,
  //       resultAnnounce: false,
  //     },
  //     temperature: {
  //       like: true,
  //       comment: false,
  //     },
  //   }
  // );
  const [notifications, setNotifications] = useState({
    community: {
      like: true,
      comment: false,
    },
    guessing: {
      beforeEnd: true,
      resultAnnounce: false,
    },
    temperature: {
      like: true,
      comment: false,
    },
  });

  console.group(notifications);
  useEffect(() => {
    if (!notifications.length) {
      fetch(`url`)
        .then((res) => res.json())
        .then((res) => {
          setNotifications(res.notifications);
        });
    }
  });

  const SettingSaveHandler = (e) => {
    e.preventDefault();
    fetch(`url`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(notifications),
    });
  };

  const [deleteAccountModalVisibility, setDeleteAccountModalVisibility] =
    useState(false);

  const modalVisibilityHandler = (e) => {
    setDeleteAccountModalVisibility(!deleteAccountModalVisibility);

    e.preventDefault();
  };

  return (
    <UserSettingsDiv>
      <h1>설정</h1>
      <SettingNickname />
      <hr className="thick" />
      <NotificationSettings
        setting={notifications["community"]}
        content="community"
        notifiacationHandler={setNotifications}
        state={notifications}
      />
      <hr className="thin" />
      <NotificationSettings
        setting={notifications["guessing"]}
        content="guessing"
        notifiacationHandler={setNotifications}
        state={notifications}
      />
      <hr className="thin" />
      <NotificationSettings
        setting={notifications["temperature"]}
        content="temperature"
        notifiacationHandler={setNotifications}
        state={notifications}
      />
      <hr className="thin" />
      <NotificationSettings
        setting={notifications["darkmode"]}
        content="darkmode"
        darkModeHandler={props.darkModeHandler}
      />
      <button className="btn__below logout" onClick={SettingSaveHandler}>
        변경 저장
      </button>
      <hr className="thick" />
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
    </UserSettingsDiv>
  );
};

export default MyPage;

const UserSettingsDiv = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
  width: 100vw;

  .btn__below {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.text};
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${size.font_mid};
    margin: 1rem;
    padding: 0.5rem 0;
    width: 80%;
  }

  hr.thin {
    border: none;
    border-top: ${(props) => `2px solid ${props.theme.colors.gray__2}`};
  }
  hr.thick {
    border: none;
    border-top: ${(props) => `4px solid ${props.theme.colors.gray__1}`};
  }
`;
