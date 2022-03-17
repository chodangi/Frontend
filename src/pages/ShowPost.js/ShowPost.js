import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import Content from "./components/Content";
import Comment from "./components/Comment";
import WriteComment from "./components/WriteComment";

const ShowPost = (props) => {

    const post = useLocation().state.post;

    return (
        <ShowingDiv id="ShowingDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <Content post={post}/>
              <div className="commentNum">댓글  (댓글개수)]</div>
              <Comment post={post}/>
              <Comment post={post}/>
              <Comment post={post}/>
              <WriteComment/>
              <div className="partition"></div>
            <Footer/>
        </ShowingDiv>
    );
}

/*<Content postObj={postObj}/>
            <div className="commentNum">댓글  [{postObj.comment.totalNum}]</div>
            <Comment postObj={postObj}/>
            <Comment postObj={postObj}/>
            <Comment postObj={postObj}/>
            <WriteComment/>
            <div className="partition"></div>
            <Post/>
            <Post/>
            <Post/>*/
const ShowingDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  font-size: 12px;

  .community__top{
    width: 100%;
    height: auto;
  }

  .board-name {
    display: flex;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .commentNum {
    display: flex;
    align-items: center;
    width: 100%;
    height: 25px;
    margin-top: 10px;
    padding-left: 10px;
    background-color: #27272A;

  }

  .partition {
      width: 100%;
      height: 20px;
      background-color: #27272A;
      box-shadow: inset 1px 2px 5px 1px gray;

  }
`;


export default ShowPost;