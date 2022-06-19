import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import {IoIosArrowDown} from 'react-icons/io';

import SearchBar from "../../components/SearchBar";
import PostList from "./components/PostList";


const contentHeight = (window.innerHeight - 130) + "px" ;

const FreeBoard = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNum => setCurrentPage(pageNum);

  const navigate = useNavigate();
  const board = useParams().boardName;
  console.log(board)
  const category = (board == 'free' ? '자유게시판' : (board == 'rich' ? '부자게시판' : (board == 'poor' ? '그지게시판' : '')));



  return (
    <CommunityDiv>
      <div className="community__top">
        <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
        <Navigator/>
        <div className="menu">
          <button className="btn sortPopularPost" onClick={()=> navigate(`trend`)}>
            실시간 인기글
          </button>
          {board == 'popular' || 
            <Link to={"/writePost"} state={{ category: category, }} className="link write">
              <button className="btn writePost">글쓰기</button>
            </Link>
          }
        </div>
      </div>
      <div className="content" style={{ minHeight: contentHeight}}>
        <PostList board={board} trend={false}/>
      </div>
      <div className="community__bottom">
        <SearchBar className="search"/>
        <Footer className="footer"/>
      </div>
    </CommunityDiv>
  );
};

export default FreeBoard;

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
    text-decoration: none;
  }

  .link {
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

