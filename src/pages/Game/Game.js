import { useState, useEffect } from "react";
import styled from "styled-components";

import CountDown from "./components/CountDown";
import Header from "../../components/Header"
import MainNav from "../../components/MainNav";
import Rank from "./components/Rank"
import { size } from "../../styles/Theme";
import CoinGame from "./components/CoinGame";
import api from "../../api/api";

const Game = (props) => {
  const [coinList, setCoinList] = useState([
    { name: '비트코인', code: 'btc', },
    { name: '이더리움', code: 'eth', },
    { name: '리플', code: 'xrp', }
  ])

  const [betData, setBetdata] = useState({});

  useEffect(() => {
    const initBetData = () => {
      const initBetObj = coinList.reduce((res, coin) => ({ ...res, [coin.code]: true }), {});
      setBetdata(initBetObj)
    }

    initBetData();
  }, [coinList])

  useEffect(() => {
    // api.post('game/game-play', { betHistoryDto: betData }).then(res => console.log('베팅완료!', res.data))
    // api.get('game/my-history').then(res=>console.log(res))
    // api.get('game/coin-prediction').then(res=>console.log(res.data))
  }, [betData])

  useEffect(() => {
    api.get('admin/game-start')
  }, [])

  const betting = ({ code }, val) => {
    setBetdata(res => ({ ...res, [code]: val }))
  }

  const onGamePlay = () =>{
    const time = new Date();
    api.post('game/game-play', { betHistoryDto: betData }).then(res => console.log(res))
    time.getMinutes() < 30 ?
    api.post('game/game-play', { betHistoryDto: betData }).then(res => {
      res.errorCode === "404" ? 
      alert(res.errorMessage) :
      alert('게임 플레이 완료!')}) :
    alert('현재 게임 플레이 가능 시간이 아닙니다')
  }

  return (
    <GameDiv>
      <Header theme={props.theme} darkModeHandler={props.darkModeHandler} />
      <MainNav />
      <div>
        <div className="game__header__container">
          <h1 className="game__header">코인 궁예대전</h1>
          <button>more</button>
        </div>
        <p>
          30분 전에 정각의 시봉을 예측해주세요.<br />
          적중 횟수에 따라 점수가 책정되며, 당신의 등급이 결정됩니다.
        </p>
        <Rank />
        <CountDown />
      </div>
      {coinList.map(coin => <CoinGame {...coin} onClick={val => { betting(coin, val) }}></CoinGame>)}

      <GameBtn  onClick={onGamePlay}>
        게임 하기
      </GameBtn>
      {/* <button onClick={()=>{api.post('game/game-play', { betHistoryDto: betData }).then(res => console.log('베팅완료!', res.data))}}>테스트</button>
      <button onClick={()=>{api.post('game/random').then(res => console.log('베팅완료!', res.data))}}>랜덤</button>
      <button onClick={()=>{api.get('game/coin-prediction').then(res => console.log(res.data))}}>coin-prediction</button>
      <button onClick={()=>{api.get('game/ranking').then(res => console.log(res.data))}}>ranking</button>
      <button onClick={()=>{api.get('game/my-history').then(res => console.log(res.data))}}>my-history</button> */}
    </GameDiv>
  );
};

export default Game;

const GameBtn = styled.button`
  background-color: ${(props) => props.theme.colors.gray__2};
  border: none;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  font-size: ${size.font_mid};
  margin: 2rem auto;
  padding: 0.5rem;
  width: 90%;
`;

const GameDiv = styled.div`
  max-width: 600px;
  margin: auto;
  text-align: center;
  width: 100vw;

  p {
      margin: 0.5rem 0;
      text-align: left;
      font-size: ${size.font_mid};
  }

  .game__header__container {
      align-items : baseline;
      display: flex;
      margin-top: 2rem;

      h1 {
          margin: 0;
      }

      button {
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.colors.blue};
        font-size: ${size.font_small};
      }
  }
`;

