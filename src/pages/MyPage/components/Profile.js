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
    profileImg: undefined,
    rank: "거지",
    level: 4,
  };

  return (
    <ProfileDiv>
      <div className="profile__nickname">{userInfo?.nickname}</div>
      <img className="profile__img" src="{userInfo?.profileImg}"></img>
      <div className="profile__ranking">
        <span>{userInfo?.rank}</span>
        <span>Lv{userInfo?.level}</span>
      </div>
    </ProfileDiv>
  );
};

export default Profile;

const ProfileDiv = styled.div`
  border: none;
  float: left;
  height: 12rem;
  padding: 0.5rem 1rem;
  width: 30%;
  text-align: center;

  img {
    width: 5rem;
    height: 5rem;
  }

  div {
    margin: 0.5rem 0;
  }

  .profile__nickname {
    font-size: ${size.font_small};
  }
  .profile__ranking {
    span {
      font-size: ${size.font_mid};
      margin-right: 0.5rem;
    }
  }
`;
