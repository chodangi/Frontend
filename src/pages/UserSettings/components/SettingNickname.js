import styled from "styled-components";
import { useState, useEffect } from "react";

import { size } from "../../../styles/Theme";

const SettingNickname = (props) => {
  const [nickname, setNickname] = useState("MC문어 28");
  useEffect(() => {
    if (!nickname.length) {
      fetch(`url`)
        .then((res) => res.json())
        .then((res) => {
          setNickname(res.nickname);
        });
    }
  });

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    fetch(`url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    });
  };

  return (
    <SettingNicknameDiv>
      <h2>닉네임 변경</h2>
      <form onSubmit={handleNicknameSubmit}>
        <input
          className="nicknameSetting__input"
          type="nickname"
          name="nickname"
          placeholder={nickname}
          onChange={handleNicknameChange}
          value={nickname}
        />
        <button className="nicknameSetting__btn" type="submit">
          변경
        </button>
      </form>
    </SettingNicknameDiv>
  );
};

export default SettingNickname;

const SettingNicknameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  h2 {
    margin: 0;
    text-align: left;
    width: 30%;
  }

  form {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 70%;
  }

  .nicknameSetting__input {
    background-color: transparent;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.text};
    font-size: ${size.font_mid};
    text-align: left;
    width: 70%;
  }
  .nicknameSetting__btn {
    cursor: pointer;
    width: 15%;
  }
`;
