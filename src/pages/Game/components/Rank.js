import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const Rank = () => {
  //   const [score, setScore] = useState(undefined);
  //   useEffect(() => {
  //     if (score == undefined) {
  //       fetch(`url`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setscore(res.score);
  //         });
  //     }
  //   });

  //   const [rank, setRank] = useState(undefined);
  //   useEffect(() => {
  //     if (rank == undefined) {
  //       fetch(`url`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setrank(res.rank);
  //         });
  //     }
  //   });

  const score = -1400
  const rank = "그지 4Lv";
  console.log(rank.slice(0,3))
  return (
      <RankDiv>
        <span>
          <h3>내 궁예 점수</h3>
          <div><ScoreSpan score={score}>{score}</ScoreSpan> 점</div>
        </span>
        <vl />
        <span>
          <h3>내 등급</h3>
          <div><RankSpan rank={rank}>{rank}</RankSpan></div>
        </span>
      </RankDiv>
  )
};

export default Rank;

const RankDiv = styled.div`
  background-color: ${(props) => `${props.theme.colors.gray__2}`};
  border: ${(props) => `1px solid ${props.theme.colors.gray__1}`};
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  margin: 2rem;

  span {
    h3 {
      margin: 0.5rem 0;
    }
    div {
      margin: 0.5rem 0;
      font-size: ${size.font_large};
      font-weight: bold;
    }
  }

  vl {
    border: None;
    border-left: ${(props) => `2px solid ${props.theme.colors.gray__1}`};
    float: right;
  }
`;

const ScoreSpan = styled.span`
  color: ${(props) =>
    props.score >= 0 ? props.theme.colors.red : props.theme.colors.blue};
`

const RankSpan = styled.span`
  color: ${(props) =>
    props.rank.slice(0,2)=='부자' ? props.theme.colors.red : props.theme.colors.blue};
`