import styled from "styled-components";

import { dark, size } from "../../../styles/Theme";

const Toggle = (props) => {
  const toggleHandler = (e) => {
    switch (props.content) {
      case "darkmode":
        console.log("lslsls", props.is_checked);
        const newTheme = props.is_checked ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        props.darkModeHandler(newTheme);
        break;
      default:
        const content = props.content;
        const subcontent = props.subcontent;
        const val = props.is_checked;
        props.notifiacationHandler({
          [`${content[subcontent]}`]: !val,
        });
    }
  };
  console.log(props);

  const mapping = {
    like: "좋아요",
    comment: "댓글",
    beforeEnd: "참여 마감 10분 전",
    resultAnnounce: "결과 안내",
    darkmode: "야간모드",
  };

  return (
    <ToggleDiv>
      <div>{mapping[props.subcontent]}</div>
      <label class="switch">
        <input
          type="checkbox"
          class="onoffswitch-checkbox"
          checked={props.is_checked ? true : false}
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
  font-size: ${size.font_small};
  justify-content: space-between;
  margin: 1rem auto;

  div {
    padding: 0.5rem;
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
