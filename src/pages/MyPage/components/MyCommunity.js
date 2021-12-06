import styled from "styled-components";

import { size } from "../../../styles/Theme";

const MyCommunity = (props) => {
  return (
    <MyCommunityBtns>
      <button className="btn__left">내가 쓴 글</button>
      <button className="btn__middle">내 댓글</button>
      <button className="btn__right">내 좋아요</button>
    </MyCommunityBtns>
  );
};

export default MyCommunity;

const MyCommunityBtns = styled.div`
  border: 2px solid ${(props) => props.theme.colors.text};
  border-radius: 10px;
  display: flex;
  height: 3rem;
  justify-content: space-evenly;
  margin: auto;
  width: 80%;

  button {
    background-color: transparent;
    border: None;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: ${size.font_mid};
    margin: 0;
    width: ${100 / 3}%;
  }
`;
