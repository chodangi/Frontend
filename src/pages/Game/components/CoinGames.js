import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

import CoinGame from "./CoinGame"

const CoinGames = () => {


  const coinList = {
      비트코인: {
          user: undefined,
          cotal: true
      },
      이더리움: {
        user: undefined,
        cotal: false
      },
      리플: {
        user: undefined,
        cotal: true
      }
  }

  const createList = (coinList) => {
    return (
      <div>
        {Object.keys(coinList).map((key) => {
        console.log(key, coinList[key])
        return <CoinGame coin={key} value={coinList[key]} />
      })}
      </div>
    )
  }

  return (
      <CoinGamesDiv>
        {createList(coinList)}
      </CoinGamesDiv>
  )
};

export default CoinGames;

const CoinGamesDiv = styled.div`
  background-color: tranparent;
`;
