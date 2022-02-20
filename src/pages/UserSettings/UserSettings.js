import styled from "styled-components";
import { useState, useEffect, useReducer } from "react";

import FooterSimple from "../../components/FooterSimple"
import SettingNickname from "./components/SettingNickname";
import NotificationSettings from "./components/NotificationSettings";
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

  return (
    <UserSettingsPage>
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
      <div className="deleteNotification">
        <p>
          지금 탈퇴하시면, 회원님의 모든 정보가<br></br>
          삭제되고 복구될 수 없습니다.<br></br>
          정말 탈퇴하시겠어요?
        </p>  
      </div>
      <button
        className="btn__below deleteAccount"
      >
        회원 탈퇴
      </button>
    </UserSettingsDiv>
    <FooterSimple />
    </UserSettingsPage>
  );
};

export default MyPage;

const UserSettingsPage = styled.div`
  width: 100vw;
  height: 100vh;
`

const UserSettingsDiv = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
  width: 100vw;

  .deleteNotification {
    background-color: ${(props) => props.theme.colors.gray__1};
    border: 2px solid ${(props) => props.theme.colors.gray__1};
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.background};
    font-size: ${size.font_mid};
    margin: auto;
    padding: 0.5rem 0;
    width: 80%;
  }

  .btn__below.deleteAccount {
    color: ${(props) => props.theme.colors.red};
    margin: 0 auto;
  }

  .btn__below {
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.text};
    border-radius: 0.5rem;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${size.font_mid};
    margin: 1rem auto;
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
