import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../api/api";

import { size } from "../../../styles/Theme";

const CoinGame = ({ name, code, onClick }) => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [randomRecommend, setRandomRecommend] = useState(true)

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

  const btnClickHandler =  (selectedIndex, val) => {
    setSelectedBtn(selectedIndex)
    if (selectedIndex === 2) {
      const randomVal = Math.random() > 0.5;
      setRandomRecommend(randomVal)
      onClick(randomVal)
    } else {
      onClick(val)
    }
  }

  return (
    <CoinGameDiv>
      <span className="coin">
        오후 4시에<br />
        <h1>{name}</h1>
      </span>
      <span className="game">
        <span onClick={() => { btnClickHandler(0, true) }} className="gameIcon">떡상각<ResultIconDiv is_up={true} selected={selectedBtn === 0}>△</ResultIconDiv></span>
        <span onClick={() => { btnClickHandler(1, false) }} className="gameIcon">떡락각<ResultIconDiv is_up={false} selected={selectedBtn === 1}>▽</ResultIconDiv></span>
        <span onClick={() => { btnClickHandler(2) }} className="gameIcon">코털의 훈수<ResultIconDiv is_up={randomRecommend} selected={selectedBtn === 2}>{randomRecommend ? "△" : "▽"}</ResultIconDiv></span>
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
    props.selected ? 1 : 0.2};
  height: 2rem;
  margin: 0.5rem auto;
  font-size: ${size.font_mid};
  font-weight: bold;
  color: ${(props) => props.theme.colors.transparent};
  width: 2rem;
`;
