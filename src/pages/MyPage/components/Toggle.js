import styled from "styled-components";

import { dark, size } from "../../../styles/Theme";

const Toggle = (props) => {
  const toggleHandler = (e) => {
    switch (props.content) {
      case "야간모드":
        const newTheme = props.theme === dark ? "light" : "dark";
        props.darkModeHandler(newTheme);
    }
  };

  return (
    <ToggleDiv>
      <div>{props.content}</div>
      <label class="switch">
        <input
          type="checkbox"
          class="onoffswitch-checkbox"
          checked={props.theme === dark ? true : false}
          onClick={toggleHandler}
        />
        <span class="slider round"></span>
      </label>
    </ToggleDiv>
  );
};

export default Toggle;

const ToggleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 70%;
  position: relative;

  div {
    font-size: ${size.font_mid};
    margin: auto 0;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.colors.yellow};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.yellow};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
