import styled from "styled-components";

import { size } from "../../../styles/Theme";

const MyCommunity = (props) => {
  return (
    <MyCommunityBtns>
      <button className="btn__left">
        내가 쓴 글
        <vl />
      </button>
      <button className="btn__middle">
        내 댓글
        <vl />
      </button>
      <button className="btn__right">내 좋아요</button>
    </MyCommunityBtns>
  );
};

export default MyCommunity;

const MyCommunityBtns = styled.div`
  display: flex;
  height: 3rem;
  justify-content: space-evenly;
  margin: auto;
  width: 100%;

  button {
    background-color: ${(props) => props.theme.colors.gray__2};
    border: None;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${size.font_mid};
    margin: 0;
    width: ${100 / 3}%;
  }

  vl {
    border: None;
    border-left: ${(props) => `2px solid ${props.theme.colors.text}`};
    float: right;
    height: 50%;
  }
`;
