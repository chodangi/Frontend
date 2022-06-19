import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Post from "./components/Post";
import Footer from "../../components/Footer";
import {IoIosArrowDown} from 'react-icons/io';

import { size } from "../../styles/Theme";
import Pagination from "./components/Pagination";
import SearchBar from "../../components/SearchBar";
import PostList from "./components/PostList";


//const width = screen.availHeight;
const contentHeight = (window.innerHeight - 130) + "px" ;
//const offsetHeight = document.getElementById('myPageDiv').offsetHeight;


const PopularBoard = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = pageNum => setCurrentPage(pageNum);


  const navigate = useNavigate();

  return (
    <CommunityDiv>
      <div className="community__top">
        <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
        <Navigator/>
        <div className="menu">
          <button className="btn sortPopularPost" onClick={()=> navigate(`trend`)}>
            실시간 인기글
          </button>
        </div>
      </div>
      <div className="content" style={{ minHeight: contentHeight}}>
        <PostList board={"popular"} trend={false}/>
      </div>
      <div className="community__bottom">
        <SearchBar className="search"/>
        <Footer className="footer"/>
      </div>
    </CommunityDiv>
  );
};

/*<Pagination postPerPage={10} totalPosts={50} paginate={paginate} />*/
/*{postList.map((p) => {
            <Link to={"/showPost"} state={{post_id: p.id}} className="link post"><Post/></Link>
          })
        } */
export default PopularBoard;

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

