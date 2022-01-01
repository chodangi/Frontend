import styled from "styled-components";

// import Toggle from "./Toggle";
import { size } from "../../../styles/Theme";

const Settings = (props) => {
  return (
    <SettingBtn>설정</SettingBtn>
    // <Toggle
    //   content="야간모드"
    //   theme={props.theme}
    //   darkModeHandler={props.darkModeHandler}
    // />
  );
};

export default Settings;

const SettingBtn = styled.button`
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  font-size: ${size.font_mid};
  margin: 2rem auto;
  padding: 0.5rem;
  width: 90%;
  background-color: ${(props) => props.theme.colors.gray__2};
`;
