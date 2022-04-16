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
