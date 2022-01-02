import React, { useState } from "react";
import styled from "styled-components";
import { screen } from "@testing-library/react";

import Header from "./components/Header";
import Navigator from "./components/Navigator";
import Post from "./components/Post";
import Footer from "../../components/Footer";
import {IoIosArrowDown} from 'react-icons/io';

import { size } from "../../styles/Theme";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import { Link } from "react-router-dom";

//const width = screen.availHeight;
//const height = screen.availHeight;
//const offsetHeight = document.getElementById('myPageDiv').offsetHeight;


const PopularBoard = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNum => setCurrentPage(pageNum);

  const [category, setCategory] = useState('인기게시판');

  return (
    <MyPageDiv id="myPageDiv">
      <div className="content">
      <div className="community__top">
        <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
        <Navigator/>
        <div className="menu">
          <button className="btn sortPopularPost">
            실시간 인기글
          </button>
          <Link to={"writePost"} state={{ category: category, }}>
            <button className="btn writePost">글쓰기</button>
          </Link>
        </div>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
      <div className="community__bottom">
        <div className="arrowDown__btn">
          <IoIosArrowDown className="arrowDown__icon"/>
        </div>
        <SearchBar className="search"/>
        <Footer className="footer"/>
      </div>
      </div>
    </MyPageDiv>
  );
};

/*<Pagination postPerPage={10} totalPosts={50} paginate={paginate} />*/

export default PopularBoard;

const MyPageDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  *{
    margin:0;
    padding:0;
  }

  .content{
    position:realtive;
    width: 100%;
    height: auto;
    min-height: 100%; //정하기
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

//210
//아니면 한 페이지에서 보여주는 post함수를 다르게?