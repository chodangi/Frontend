import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams} from "react-router-dom";

import axios from "axios";
import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import Post from "./components/Post";
import SearchBar from "../../components/SearchBar";


const contentHeight = (window.innerHeight - 130) + "px" ;


const Search = (props) => {

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [postList, setPostList] = useState([]);

  useEffect(()=>{
    const arr = decodeURI(pathname).split('/');
    console.log(arr)

    axios({
      method: "get",
      url: `https://www.coinfortal.com:8080/community/${arr[2]}/${encodeURIComponent(arr[3])}`,
      headers: {'Content-Type': "application/json;charset=UTF-8"},

    }).then((response) => {
      console.log(response.data);
      setPostList(Object.values(response.data.data));
    })

  },[pathname])

  return (
    <SearchDiv>
      <div className="community__top">
        <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
        <Navigator/>
      </div>
      <div className="content" style={{ minHeight: contentHeight}}>
        {
          postList.map((p)=>{
            <div onClick={()=> navigate(`/showPost/${p.id}`)} key={p.id}>
              <Post post={p}/>
            </div>
          })
        }
      </div>
      <div className="community__bottom">
        <SearchBar className="search"/>
        <Footer className="footer"/>
      </div>
    </SearchDiv>
  );
};

export default Search;

const SearchDiv = styled.div`

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

