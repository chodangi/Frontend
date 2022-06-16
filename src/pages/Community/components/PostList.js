import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "./Post";

import { Link } from "react-router-dom";

const PostList = ({board}) => {

    console.log(board)

    const [postList, setPostList] = useState([]);

    const showAllPost = async () => {
        await axios({
          method: "get",
          url: "http://13.209.180.179:8080/community/posts",
          headers: {'Content-Type': "application/json;charset=UTF-8"},
    
        }).then((response) => {
                console.log(response.data);
                console.log(Object.values(response.data.data).filter((p)=>{ return p.status == 'A';}).slice(0,4));
                console.log(Object.values(response.data.data));
                setPostList(Object.values(response.data.data));
              })
          .catch((error) => {
                console.log(error.response.data);
          })
      }
    
      useEffect(()=>{
        showAllPost();
      },[])

    return(
        <>
        {postList.map((p)=> {
          if(p.status == 'A'){
            if(board == "popular"){
              if(p.upCnt >= 10) {
                return (
                  <Link to={`/showPost/${p.id}`} className="link post" key={p.id}><Post post={p} /></Link>
                )
              }
            } else if(board == "free") {
              if(p.boardName == "자유게시판") {
                return (
                  <Link to={`/showPost/${p.id}`} className="link post" key={p.id}><Post post={p} /></Link>
                )
              }
            } else if(board == "rich") {
              if(p.boardName == "부자게시판") {
                return (
                  <Link to={`/showPost/${p.id}`} className="link post" key={p.id}><Post post={p} /></Link>
                )
              }
            } else if(board == "poor") {
              if(p.boardName == "그지게시판") {
                return (
                  <Link to={`/showPost/${p.id}`} className="link post" key={p.id}><Post post={p} /></Link>
                )
              }
            }
            }
        })}
        </>
    );
}

export default PostList;
