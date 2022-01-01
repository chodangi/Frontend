import { useState, useEffect } from "react";
import styled from "styled-components";

import { size } from "../../../styles/Theme";

const Profile = () => {
  //   const [userInfo, setUserInfo] = useState([]);
  //   useEffect(() => {
  //     if (!userInfo.length) {
  //       fetch(`url`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setUserInfo(res.userInfo);
  //         });
  //     }
  //   });

  const userInfo = {
    nickname: "MC문어 28",
    is_rich: false,
    level: 4,
  };
  const hitRatio = 63.7;

  return (
    <ProfileDiv>
      <ProfileImgDiv rank={userInfo?.is_rich}>
        {userInfo?.level}
        <br />
        {userInfo?.is_rich ? "부자" : "그지"}
      </ProfileImgDiv>
      <ProfileTxtDiv>
        <div className="profile__nickname">{userInfo?.nickname}</div>
        <div className="profile__hitRatio">평균 적중률: {hitRatio}%</div>
      </ProfileTxtDiv>
    </ProfileDiv>
  );
};

export default Profile;

const ProfileDiv = styled.div`
  border: none;
  display: flex;
  font-size: ${size.font_large};
  height: 8rem;
  justify-content: space-between;
  margin: 2rem;
  padding: 0.5rem 1rem;
  text-align: center;

  .profile__nickname {
    text-align: left;
    margin-bottom: 1rem;
    width: 80%;
  }
  .profile__hitRatio {
    text-align: left;
    margin-top: 1rem;
    width: 80%;
  }
`;

const ProfileImgDiv = styled.div`
  background-color: ${(props) =>
    props.is_rich ? props.theme.colors.red : props.theme.colors.blue};
  border-radius: 100%;
  height: 100%;
  padding: 1.5rem;
  aspect-ratio: 1/1;
`;

const ProfileTxtDiv = styled.div`
  float: right;
  margin: auto;
  width: 60%;
`;
