import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from 'react-router-dom';

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import Content from "./components/Content";
import Comment from "../../components/Comment/Comment";
import CommentEditor from "../../components/Comment/CommentEditor";

const ShowPost = (props) => {

    //const post = useLocation().state.post;


    //게시글 조회
    const postId = useParams().postId
    console.log(postId)

    const [post, setPost] = useState([]);

    useEffect(()=>{
      try { 
        fetch(`http://13.209.180.179:8080/community/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => {
          response.json().then((data) =>{ 
            console.log(data.data);
            setPost(data.data);
            console.log(post)
           
          })
        }) 
      }
      catch(error) {
        console.log(error)
      }
    },[])


  

    return post && (
        <ShowingDiv id="ShowingDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <Content post={post}/>
            <div className="commentNum">댓글  ({post.comments?.length})</div>
            <Comment post={post}/>
            <Comment post={post}/>
            <Comment post={post}/>
            <CommentEditor postId={post.id}/>
            <Footer/>
        </ShowingDiv>
    );
}

/*<Content post={post}/>
              <div className="commentNum">댓글  (댓글개수)]</div>
              <Comment post={post}/>
              <Comment post={post}/>
              <Comment post={post}/>
              <CommentEditor postId={post.id}/>*/

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