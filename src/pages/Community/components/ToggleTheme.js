import styled from "styled-components";

import { dark } from "../../../styles/Theme";

const ToggleTheme = (props) => {
  const themeHandler = () => {
        const newTheme = props.theme === dark ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        props.darkModeHandler(newTheme);
  };

  return (
        <ToggleDiv className="theme__img" src={props.theme === dark ? "undefined" : "undefined"} onClick={themeHandler}></ToggleDiv>
  );
};

export default ToggleTheme;

const ToggleDiv = styled.img`
    display: block;
`;
