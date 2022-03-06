import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const CountDown = () => {
  const nextGameTime = 6;
  const minLeft = 23;
  const secLeft = 57;

  return (
      <CountDownDiv>
        <h2>{nextGameTime}시 게임 참여 시간 <span>{minLeft}</span>:<span>{secLeft}</span> 남음</h2>
      </CountDownDiv>
  )
};

export default CountDown;

const CountDownDiv = styled.div`
  h2 {
    color: ${(props) => `${props.theme.colors.text}`};
    font-size: ${size.font_mid};
    font-weight: bold;

    span {
      color: ${(props) => `${props.theme.colors.yellow}`};
    }

  }
`