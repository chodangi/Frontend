import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";
import Toggle from "./Toggle";

const NotificationSettings = (props) => {
  const mapping = {
    community: "커뮤니티",
    guessing: "코인궁예대전",
    temperature: "코인체감온도",
    darkmode: "야간모드 설정",
  };
  console.log(props.setNotifications);
  return (
    <ToggleLindDiv>
      <h3>{mapping[props.content]}</h3>
      {props.content === "darkmode" ? (
        <Toggle
          content={props.content}
          subcontent={props.content}
          is_checked={localStorage.getItem("theme") == "dark" ? true : false}
          darkModeHandler={props.darkModeHandler}
        >
          야간모드
        </Toggle>
      ) : (
        Object.keys(props.setting).map((key) => {
          console.log(key);
          return (
            <Toggle
              content={props.content}
              subcontent={key}
              is_checked={props.setting[key]}
              notifiacationHandler={props.notifiacationHandler}
            >
              {props.setting[key]}
            </Toggle>
          );
        })
      )}
    </ToggleLindDiv>
  );
};

export default NotificationSettings;

const ToggleLindDiv = styled.div`
  margin: 0 auto;
  width: 90%;

  h3 {
    font-size: ${size.font_mid};
    font-weight: bold;
    text-align: left;
  }
`;
