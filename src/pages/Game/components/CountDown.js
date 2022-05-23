import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const CountDown = () => {
  const [nextGameTime, setNextGameTime] = useState(0)
  const [minLeft, setMinLeft] = useState(0)
  const [secLeft, setSecLeft] = useState(0)
  const [possibleJoinGame, setPossibleJoinGame] = useState(true);

  useEffect(() => {
    const now = new Date()
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();
    const nowSec = now.getSeconds();
    if (nowMin > 29) setPossibleJoinGame(false)

    setNextGameTime(nowHour + 1)
    setMinLeft(29 - nowMin)
    setSecLeft(59 - nowSec)
    setInterval(() => {
      checkTime()
    }, 1000);
  }, [])

  const checkTime = () => {
    setSecLeft(res => {
      if (res === 0) {
        setMinLeft(resMin => {
          if (resMin < 1) {
            setPossibleJoinGame(false)
            return 59;
          }
          else {
            if (resMin === 30) setPossibleJoinGame(true)
            return resMin - 1
          }
        })
        return 59;
      } else {
        return res - 1;
      }
    })
  }

  return (
    <CountDownDiv>
      {possibleJoinGame ?
        <h2>{nextGameTime}시 게임 참여 시간 <span>{minLeft}</span>:<span>{secLeft}</span> 남음</h2>
        : <h2>게임 참여 종료</h2>
      }

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