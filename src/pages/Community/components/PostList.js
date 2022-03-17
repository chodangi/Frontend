import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Post from "./Post";

import { Link } from "react-router-dom";

const PostList = () => {

    const [postList, setPostList] = useState([]);

    const showAllPost = async () => {
        await axios({
          method: "get",
          url: "/api/community/posts",
          headers: {'Content-Type': "application/json;charset=UTF-8"},
    
        }).then((response) => {
                console.log(response.data);
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
            return (
                <Link to={"/showPost"} state={{post: p}} className="link post" key={p.id}><Post post={p}/></Link>
            )
        })}
        </>
    );
}

export default PostList;

const PostListDiv = styled.div`
    width: 100%;
    height: 72px;
    font-size: 12px;
    
    *{
        align-items:center;
        justify-content:center;
    }

    hr {
        margin: 0;
    }

    .post__contents{
        height: 100%;
        padding: 10px 20px 15px 20px;
    }

    .line{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }

    .top.line{
        height: 20px;
        margin-bottom: 15px;
    }

    .bottom.line{
        height: 15px;
    }

    .post__title{
        width: 220px;
        height: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
        font-size: 14px;
        font-weight: bold;
    }

    .part-right{
        display: flex;
    }

    .post__category{
        margin-right: 4px;
    }

    .post__user{
        display:flex;
    }

    .post__tier{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        margin-right:3px;
        border-radius: 50%;
        background-color: #3498DB; //나중에 티어별 적용 필요
        //font-size 티어가 세 자리수일 때 조정 필요
    }

    .post__heart{
        padding-right:8px;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15px;
    }

    .icon{
        width: 15px;
        height: 15px;
        margin-right: 3px;
    }

    .heart{
        color: red;
    }

`