import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const CountDown = () => {
  const [nextGameTime, setNextGameTime] = useState(0)
  const [minLeft, setMinLeft] = useState(0)
  const [secLeft, setSecLeft] = useState(0)
  const [possibleJoinGame, setPossibleJoinGame] = useState(true);
  const START_MINUTE = 30;
  const START_SECONDS = 0;

  useEffect(() => {
    const initTime = () => {
      const [nowHour, nowMin, nowSec] = getTime()
      const leftMinute = 60 - (nowMin - START_MINUTE) - 1;
      const leftSeconds = 60 - (nowSec - START_SECONDS) - 1;
      const nextStartTime = nowHour + 1

      setNextGameTime(nextStartTime)
      setMinLeft(leftMinute)
      setSecLeft(leftSeconds)
    }

    const getTime = (now = new Date()) => [now.getHours(), now.getMinutes(), now.getSeconds()]
    const startCount = () => setInterval(() => setSecLeft(res => res - 1), 1000)

    initTime()
    startCount()
  }, [])

  useEffect(() => {
    if (secLeft < 0) {
      setSecLeft(59)
      setMinLeft(resMin => resMin - 1)
    }
  }, [secLeft])

  useEffect(() => {
    if (minLeft < 0) setMinLeft(59)
    setPossibleJoinGame(minLeft < START_MINUTE ? true : false)
  }, [minLeft])

  return (
    <CountDownDiv>
      <h2>
        {possibleJoinGame ? <>{nextGameTime}시 게임 참여 시간 <span>{minLeft}</span>:<span>{secLeft}</span> 남음</> : <>게임 참여 종료</>}
      </h2>
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