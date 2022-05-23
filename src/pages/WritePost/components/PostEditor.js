import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import TextField from "../../../components/TextField";
import CategoryPicker from "./CategoryPicker";

import { FiImage } from "react-icons/fi";


const PostEditor = ({category, isEditing, postObj}) => {

  const navigate = useNavigate();

  //로그인여부
  const jwt = localStorage.getItem('user');
  const user = useState(jwt ? true : false)
    
  
  //유튜브모달  
  const [visible, setVisible] = useState(false);

  const openModal = () => {
      setVisible(true);
  }

  //글쓰기

  const editedPost= isEditing ? {
    "attachedFiles": postObj.attachedFiles,
    "boardName": postObj.boardName,
    "content": postObj.content,
    "guestName": postObj.guestName,
    "guestPwd": postObj.guestPwd,
    "nickname": postObj.userNickname,
    "postId": postObj.id,
    "userId": postObj.userId
  } : {}
  
  const [post, setPost] = useState(isEditing ? 
    editedPost
    :
    {
    nickname: '',
    content: '',
    boardName: category,
    guestName: '',
    guestPwd: '0000',
  })

  const onChange = (e) => {
    const { id } = e.currentTarget;

    if( id == "content") {
      if(isEditing){
        editedPost.content  = e.currentTarget.innerHTML
      } else {
        setPost({
          ...post,
          [id]: e.currentTarget.innerHTML
        });
      }
      console.log(editedPost);
    } else if( id == "guestName"){
      setPost({
        ...post,
        [id]: e.currentTarget.value,
        nickname: e.currentTarget.value
      });
      console.log(post);
    } else if( id == "guestPwd" ){
      setPost({
        ...post,
        [id]: e.currentTarget.value,
      });
    } else if( id.substring(id.length-5, id.length) == "board"){
    
      let selectedCategory = "";

      switch (id) {
        case "popular-board" : 
          selectedCategory = '인기게시판';
          break;
        
        case "free-board" :
          selectedCategory = '자유게시판';
          break;

        case "rich-board" :
          selectedCategory = '부자게시판';
          break;
        
        case "poor-board" :
          selectedCategory = '그지게시판';
          break;
      }
      if(isEditing) {
        console.log('4')
        editedPost.boardName  = selectedCategory;
      } else {
        setPost({
          ...post,
          boardName: selectedCategory,
        });
      }


      console.log(editedPost);
    }
    
  }


  const onReset = () => {
    setPost({
      nickname: 'name',
      content: 'content',
      boardName: '자유게시판',
      guestName: 'guest',
      guestPwd: 'password',
    });
  }
  
  
  // 게시글 작성

  const createPost = async () => {

    if(post.guestName == "") {
      console.log("빈칸을 채우세요");
      return;
    }

    await fetch(`http://13.209.180.179:8080/profile/my-settings`, {
      method: 'GET',
      headers: {
        jwt: jwt,
      },
    }).then((response) => {
      console.log(response);
    })

    const makeQuery = obj => Object.keys(obj).reduce((res,key)=>{
      return res + `&${key}=${obj[key]}`
    },'').substring(1)


    await fetch(`http://13.209.180.179:8080/attach/post-image?${makeQuery(post)}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        jwt: jwt,
      },
    })
      .then((response) => {
        navigate(-1);
      })

  }

  const createPostByGuest = async () => {

    if(post.guestPwd == "password" || post.guestName == "guest") {
      console.log("빈칸을 채우세요");
      return;
    }
    

    await axios
          .post("/api/attach/post-image",null, {
            params: editedPost
          })
          .then((response) => {
              console.log(response.data);
              console.log("글 작성 완료");
              navigate(-1);
            })
          .catch((error) => {
              console.error("실패했습니다");
          })
  }

  // 게시글 수정

  const updatePost = async () => {

    console.log(postObj);
    console.log(editedPost);

    try {await fetch(`http://13.209.180.179:8080/community/post`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        jwt: jwt,
      },
      body:JSON.stringify(editedPost),
    })
      .then((response) => {
        navigate(-1);
      }) 
      .catch((error) => {
        console.log(error.response.data);
    })
    }
    catch(error) {
      console.log(error)
    }
}

  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      <PostEditorDiv>
        <div className="title-box">
          <div className="title">글쓰기</div>
          <CategoryPicker className="categoryPicker" category={category} onChange={onChange}></CategoryPicker>
        </div>
        <div className="userInfo">
          <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="guestName" value={post.nickname} onChange={onChange}></input>
          {
            user 
            ? 
            <></>
            :
            <input type="password" className="input password" placeholder="비밀번호" id="guestPwd" value={post.guestPwd} onChange={onChange}></input>
          }
        </div>
        <TextField onChange={onChange} content={isEditing && postObj.content}/>
        <div className="submit-box">
          <div className="btn-box">
            <FiImage className="btn image" size="2rem" />
          </div>
          <button className="submit" onClick={user ? (isEditing ? updatePost: createPost) : createPostByGuest}>완료</button>
        </div>
        {visible && <YoutubeModal visible={visible} setVisible={setVisible}/>}
      </PostEditorDiv>
  );
};


export default PostEditor;

const PostEditorDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  font-size: 12px;

  .title-box {
    display: flex;
    justify-content: space-between;
    z-index: 100;
    width: 100%;
    height: 50px;
    padding: 15px 20px 15px 20px;
  }

  .title {
    height: 20px;
    font-size: 14px;
    font-weight: bold;
  }

  .categoryPicker {
    text-align: center;
    width: 80px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    padding-top: 1.5px;
    color: #000000;
  }

  .userInfo {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0px 20px 0px 20px;
    border-top: 2px solid #444444;
    border-bottom: 2px solid #444444;
  }

  .input {
    height: 30px;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.colors.text}; 
    font-size: 12px;
  }

  .input.nickname{
    width: 135px;
    border-right: 2px solid #444444;
    padding: 0;
  }

  .input.password{
    width: 160px; //닉네임이랑 비밀번호 너비 조정 필요 나중에 비율로 주기
    padding-left: 20px;
  }

  .input.content {
    width: 100%;
    min-height: 120px;
    size: 10; 
    padding: 10px 20px 0px 20px;
    border-bottom: 2px solid #444444;
  }

  .submit-box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 0px 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #444444;
  }

  .btn-box {
    display: flex;
    align-items: center;
  }

  .btn {
    margin-right: 10px;
  }

  .submit {
    width: 50px;
    height: 25px;
    padding-bottom: 2px;
    border-color: transparent;
    border-radius: 5px;
    background-color: #3498DB;
  }

    
`;
