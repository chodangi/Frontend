import styled from "styled-components";

import Toggle from "./Toggle";

const Settings = (props) => {
  return (
    <div>
      <h2>설정</h2>
      <Toggle
        content="야간모드"
        theme={props.theme}
        darkModeHandler={props.darkModeHandler}
      />
    </div>
  );
};

export default Settings;

const SettingsDiv = styled.div``;
