import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import PostEditor from "../WritePost/components/PostEditor";



//const width = screen.availHeight;
//const height = screen.availHeight;
//const offsetHeight = document.getElementById('myPageDiv').offsetHeight;


const EditPost = (props) => {

    const post = useLocation().state.post;
  
    const category = useLocation().state.category || '자유게시판';


    return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        <EditPostDiv id="EditingPostDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <PostEditor category={category} isEditing={true} postObj={post}/>
            <div className="guide">
              <p>사진은 최대 10개까지 업로드 가능합니다.</p><p>쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉽습니다.</p>
            </div>
        </EditPostDiv>
    );
    };


export default EditPost;

const EditPostDiv = styled.div`

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
