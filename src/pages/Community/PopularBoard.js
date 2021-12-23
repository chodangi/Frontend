import React, { useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import Navigator from "./components/Navigator";
import Footer from "../../components/Footer";
import {IoIosArrowDown} from 'react-icons/io'

import { size } from "../../styles/Theme";
import Pagination from "./components/Pagination";

const PopularBoard = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNum => setCurrentPage(pageNum);

  return (
    <MyPageDiv>
      <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
      <Navigator/>
      <div className="menu">
        <button className="btn sortPopularPost">
          실시간 인기글
        </button>
        <button className="btn writePost">
          글쓰기
        </button>
      </div>
      <hr width='100%' size='2' color='#444444' noshade />
      <IoIosArrowDown className="arrowDown"/>
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

  *{
      margin:0;
      padding:0;
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

  .arrowDown{
    width: 30px;
    height: 30px;
  }
`;
