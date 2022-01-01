import styled from "styled-components";
import { useState, useEffect } from "react";

import { size } from "../../../styles/Theme";

const DeleteAccountModal = (props) => {
  console.log(props.visiblityHandler);
  return (
    <DeleteAccountModalDiv>
      <p>
        지금 탈퇴하시면, 회원님의 모든 정보가 삭제되고 복구될 수 없습니다. 정말
        탈퇴하시겠어요?
      </p>
      <button className="delete__confirm">탈퇴하기</button>
      <button className="delete__cancel" onClick={props.visiblityHandler}>
        취소
      </button>
    </DeleteAccountModalDiv>
  );
};

export default DeleteAccountModal;

const DeleteAccountModalDiv = styled.div`
  background-color: ${(props) => props.theme.colors.gray__1};
  border-radius: 10px;
  color: black;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  transform: translateY(-50%);
  width: 70%;
  z-index: 99;

  p {
    margin: 0;
  }

  button {
    background-color: ${(props) => props.theme.colors.gray__2};
    border-radius: 5px;
    width: 60%;
  }

  button.delete__confirm {
    color: ${(props) => props.theme.colors.red};
    margin-top: 0.5rem;
  }
  button.delete__cancel {
    color: ${(props) => props.theme.colors.blue};
    margin: 0.5rem 0;
  }
`;
