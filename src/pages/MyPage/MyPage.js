import styled from "styled-components";

import History from "./components/History";
import Profile from "./components/Profile";

const MyPage = () => {
  return (
    <MyPageDiv>
      <Profile />
      <History />
    </MyPageDiv>
  );
};

export default MyPage;

const MyPageDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  width: 100vw;
`;
