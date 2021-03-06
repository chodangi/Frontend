import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../../api/api";

import { size } from "../../../styles/Theme";

const Rank = () => {
  const [point, setPoint] = useState(0)
  const [rank, setRank] = useState('123')

  const getUserData = async () => {
    const { data } = await api.get('profile/my-settings')
    return data;
  }

  useEffect(() => {
    async function init() {
      const { point } = await getUserData();
      setPoint(point)
      setRank(checkPoint(point))
    }
    
    const checkPoint = point => {
      if (point > 1000) {
        return `부자 lv${Math.floor((point - 999) / 100)}`
      } else if (point > -1000) {
        return '중산층'
      } else {
        return `거지 lv${Math.floor((point + 999) / 100) * -1}`
      }
    }

    init()
  }, [])


  return (
    <RankDiv>
      <span>
        <h3>내 궁예 점수</h3>
        <div><ScoreSpan score={point}>{point}</ScoreSpan> 점</div>
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
    props.rank.slice(0, 2) == '부자' ? props.theme.colors.red : props.theme.colors.blue};
`