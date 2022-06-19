import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import {IoIosArrowDown} from 'react-icons/io';

import SearchBar from "../../components/SearchBar";
import PostList from "./components/PostList";


const contentHeight = (window.innerHeight - 130) + "px" ;

const PoorBoard = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNum => setCurrentPage(pageNum);

  const category = '그지게시판';

  //로그인여부
  const jwt = localStorage.getItem('user');
  const user = useState(jwt ? true : false);

  //사용자 접근
  const [restriction, setRestriction] = useState(true);

  useEffect(()=>{
      if(user[0] == true) {
        fetch(`http://13.209.180.179:8080/profile/my-settings`, {
            method: 'GET',
            headers: {
                jwt: jwt,
            },
        }).then((response) => {
          response.json().then((data) =>{  
            console.log(data.data?.point);
            if(data.data?.point <= -1000)
              setRestriction(false);
          }) 
        })
      }
  },[user])

  const navigate = useNavigate();

  const moveToEditor = () => {
    if(restriction == false) {
      navigate('/writePost');
    } else {
      alert('등급이 그지인 회원만 작성할 수 있습니다.')
    }
  }


  return (
    <CommunityDiv>
      <div className="community__top">
        <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
        <Navigator/>
        <div className="menu">
          <button className="btn sortPopularPost" onClick={()=> navigate(`trend`)}>
            실시간 인기글
          </button>
          <button className="btn writePost" onClick={moveToEditor}>글쓰기</button>
        </div>
      </div>
      <div className="content" style={{ minHeight: contentHeight}}>
        <PostList board={"poor"} trend={false}/>
      </div>
      <div className="community__bottom">
        <SearchBar className="search"/>
        <Footer className="footer"/>
      </div>
    </CommunityDiv>
  );
};

export default PoorBoard;

const CommunityDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;

  .content{
    position:realtive;
    width: 100%;
    height: auto;
  }

  .community__top{
    width: 100%;
    height: auto;
  }


  .menu{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding-top:20px;
    padding-left:10px;
    padding-right:10px;
  }

  .btn {
    display:flex;
    justify-content:center;
    align-items:center;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: 0px;
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }

  .btn.sortPopularPost{
    width: 90px;
    height: 20px; //안들어가서 크기 조정함
  }

  .btn.writePost{
    width: 50px;
    height: 20px; //안들어가서 크기 조정함
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }


  .arrowDown__btn{
    width:100%
    height: 30px;
    margin-bottom: 10px;
  }

  .arrowDown__icon{
    //position: absolute;
    //top: 500px;
    width: 30px;
    height: 30px;
  }

  .community__bottom{
    position: relative;
    //transform: translateY(-100%);
    display:flex;
    flex-direction: column;
    align-items:center;
    width: 100%;
    height: 210px;
    margin-top:10px;
  }

  .search{
    z-index: 100;
    margin-bottom: 10px;
  }

  .footer{
    width:100%;
    height:100%;
  }
`;

