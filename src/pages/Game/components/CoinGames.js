import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

import CoinGame from "./CoinGame"

const CoinGames = ({ coinList = [] }) => {
  const createList = coinList => <div>
    {Object.keys(coinList).map((key) => {
      return <CoinGame coin={key} value={coinList[key]} />
    })}
  </div>

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
