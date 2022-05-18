import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../api/api";

import { size } from "../../../styles/Theme";

const CoinGame = ({name,code}) => {

  const getCoinCurrentValue = async () => {
    const { data } = await api.get(`game/coin-price/${code}`)
    return data;
  }

  useEffect(() => {
    async function test() {
      const data = await getCoinCurrentValue()

    }
    test();
  }, [])

  return (
    <CoinGameDiv>
      <span className="coin">
        오후 4시에<br />
        <h1>{name}</h1>
      </span>
      <span className="game">
        <span className="gameIcon">떡상각<ResultIconDiv is_up={true} is_checked={false}>△</ResultIconDiv></span>
        <span className="gameIcon">떡락각<ResultIconDiv is_up={false} is_checked={false}>▽</ResultIconDiv></span>
        <span className="gameIcon">코털의 훈수<ResultIconDiv is_up={false} is_checked={true}>{false ? "△" : "▽"}</ResultIconDiv></span>
      </span>
    </CoinGameDiv>
  )
};

export default CoinGame;


const CoinGameDiv = styled.div`
    background-color: ${(props) => `${props.theme.colors.gray__2}`};
    border: ${(props) => `1px solid ${props.theme.colors.gray__1}`};
    border-radius: 5px;
    color: ${(props) => props.theme.colors.text};
    display: flex;
    font-size: ${size.font_small};
    height: 7rem;
    padding: 1rem;
    margin: 2rem auto;
    width: 90%;

    h1 {
        margin: 0;
    }

    .coin {
        text-align: left;
        width: 35%;
    }
    .game {
        display: flex;
        justify-content: space-between;
        width: 65%

    }
    .gameIcon {
        margin: 0 0.5rem;
    }
`

const ResultIconDiv = styled.div`
  border-radius: 100%;
  background-color: ${(props) =>
    props.is_up ? props.theme.colors.red : props.theme.colors.blue};
  opacity: ${(props) =>
    props.is_checked ? 1 : 0.2};
  height: 2rem;
  margin: 0.5rem auto;
  font-size: ${size.font_mid};
  font-weight: bold;
  color: ${(props) => props.theme.colors.transparent};
  width: 2rem;
`;
