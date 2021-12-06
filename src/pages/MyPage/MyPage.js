import styled from "styled-components";

import History from "./components/History";
import Profile from "./components/Profile";
import MyCommunity from "./components/MyCommunity";
import { size } from "../../styles/Theme";

const MyPage = (props) => {
  console.log("??????", props);
  return (
    <MyPageDiv>
      <div className="mypage__header">내 정보</div>
      <ProfileMainDiv>
        <Profile />
        <History />
      </ProfileMainDiv>
      <MyCommunity theme={props.theme} />
    </MyPageDiv>
  );
};

export default MyPage;

const MyPageDiv = styled.div`
  text-align: center;

  .mypage__header {
    font-size: ${size.font_large};
    font-weight: bold;
  }
`;

const ProfileMainDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 600px;
  width: 100vw;
`;
