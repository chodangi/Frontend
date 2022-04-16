import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import TextField from "../../../components/TextField";
import CategoryPicker from "./CategoryPicker";
import YoutubeModal from "./YoutubeModal";

import { FiImage } from "react-icons/fi";
import { FaYoutubeSquare } from "react-icons/fa";
import { BiHeartSquare } from "react-icons/bi";


const PostEditor = ({category}) => {

  //유튜브모달  
  const [visible, setVisible] = useState(false);

  const openModal = () => {
      setVisible(true);
  }

  //글쓰기
  const [post, setPost] = useState({
    nickname: 'name',
    content: 'content',
    boardName: category,
    guestName: 'guest',
    guestPwd: 'password',
  })

  const onChange = (e) => {
    const { id } = e.currentTarget;

    console.log(id.substring(id.length-5, id.length));
    if( id == "content") {
      setPost({
        ...post,
        [id]: e.currentTarget.innerHTML
      });
      console.log(post);
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

      setPost({
        ...post,
        boardName: selectedCategory,
      });

      console.log(post);
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
  
  
  const createPost = async () => {

    if(post.guestPwd == "password" || post.guestName == "guest") {
      console.log("빈칸을 채우세요");
      return;
    }

    await axios
           .post("/api/post/non-user",null, {
              params: post
            }
          )
          .then((response) => {
              console.log(response.data);
              console.log("글 작성 완료");
            })
          .catch((error) => {
              console.error("실패했습니다");
          })
    }


  
  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      <PostEditorDiv>
        <div className="title-box">
          <div className="title">글쓰기</div>
          <CategoryPicker className="categoryPicker" category={category} onChange={onChange}></CategoryPicker>
        </div>
        <div className="userInfo">
          <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="guestName" onChange={onChange}></input>
          <input type="password" className="input password" placeholder="비밀번호" id="guestPwd" onChange={onChange}></input>
        </div>
        <TextField onChange={onChange}/>
        <div className="submit-box">
          <div className="btn-box">
            <FiImage className="btn image" size="2rem" />
            <FaYoutubeSquare className="btn youtube" size="1.9rem" onClick={openModal}/>
            <BiHeartSquare className="btn emoticon" size="2.1rem"/>
          </div>
          <button className="submit" onClick={createPost}>완료</button>
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
