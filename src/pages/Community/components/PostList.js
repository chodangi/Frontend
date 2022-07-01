import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "./Post";

import { useNavigate } from "react-router-dom";

const PostList = ({board, trend}) => {

    const navigate = useNavigate();


    const [postList, setPostList] = useState([]);
    const [trendList, setTrendList] = useState([]);

    const showAllPost = async () => {
        await axios({
          method: "get",
          url: "https://www.coinfortal.com:8080/community/posts",
          headers: {'Content-Type': "application/json;charset=UTF-8"},
    
        }).then((response) => {
                console.log(response.data);
                setPostList(Object.values(response.data.data));
              })
          .catch((error) => {
                console.log(error.response?.data);
          })
      }

    const showTrendPost = async() => {
      await axios({
        method: "get",
        url: "https://www.coinfortal.com:8080/community/up-count",
        headers: {'Content-Type': "application/json;charset=UTF-8"},
  
      }).then((response) => {
              console.log(response.data);
              setTrendList(Object.values(response.data.data));
            })
        .catch((error) => {
              console.log(error.response?.data);
        })
    }

    useEffect(()=>{
      showAllPost();
      showTrendPost();
    },[])

    return(
        <>
        {(trend ? trendList : postList).map((p)=> {
          if(p.status == 'A'){
            if(board == "popular"){
              if(p.upCnt >= 10) {
                return (
                  <div onClick={()=> navigate(`/showPost/${p.id}`)}  key={p.id}>
                    <Post post={p}/>
                  </div>
                )
              }
            } else if(board == "free") {
              if(p.boardName == "자유게시판") {
                return (
                  <div onClick={()=> navigate(`/showPost/${p.id}`)}  key={p.id}>
                    <Post post={p}/>
                  </div>
                )
              }
            } else if(board == "rich") {
              if(p.boardName == "부자게시판") {
                return (
                  <div onClick={()=> navigate(`/showPost/${p.id}`)}  key={p.id}>
                    <Post post={p}/>
                  </div>
                )
              }
            } else if(board == "poor") {
              if(p.boardName == "그지게시판") {
                return (
                  <div onClick={()=> navigate(`/showPost/${p.id}`)}  key={p.id}>
                    <Post post={p}/>
                  </div>
                )
              }
            }
            }
        })}
        </>
    );
}

export default PostList;
