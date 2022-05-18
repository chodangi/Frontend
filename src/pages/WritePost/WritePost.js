import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import { FiImage } from "react-icons/fi";
import { FaYoutubeSquare } from "react-icons/fa";
import { BiHeartSquare } from "react-icons/bi";

import TextField from "../../components/TextField";
import CategoryPicker from "./components/CategoryPicker";
import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import YoutubeModal from "./components/YoutubeModal";
import PostEditor from "./components/PostEditor";



//const width = screen.availHeight;
//const height = screen.availHeight;
//const offsetHeight = document.getElementById('myPageDiv').offsetHeight;


const WritePost = (props) => {
  
  const category = useLocation().state.category || '자유게시판';

    const removePost = async () => {
      await axios
            .get("/api/community/post/non-user/5/")
            .then((response) => {
              console.log(response.data);
              console.log("글 삭제 완료");
            })
            .catch((error) => {
              console.error("실패했습니다");
            })
    }


    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        <WritePostDiv id="WritingPostDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <PostEditor category={category} isLoggedIn={props.isLoggedIn}/>
            <div className="guide">
              <p>사진은 최대 10개까지 업로드 가능합니다.</p><p>쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉽습니다.</p>
            </div>
        </WritePostDiv>
    );
    };


export default WritePost;

const WritePostDiv = styled.div`

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

  
  .guide {
    width: 90%;
  }

  .guide p {
    margin-bottom: 2px;
  }
`;
