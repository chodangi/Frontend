import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

import { FiImage } from "react-icons/fi";
import { FaYoutubeSquare } from "react-icons/fa";
import { BiHeartSquare } from "react-icons/bi";

import Editor from "./components/Editor";
import CategoryPicker from "./components/CategoryPicker";
import Header from "../Community/components/Header";
import Navigator from "../Community/components/Navigator";import YoutubeModal from "./components/YoutubeModal";
;


//const width = screen.availHeight;
//const height = screen.availHeight;
//const offsetHeight = document.getElementById('myPageDiv').offsetHeight;


const WritePost = (props) => {
    
    const category = useLocation().state.category;

    const [visible, setVisible] = useState(false);
    
    const openModal = () => {
      setVisible(true);
    }

    return (
        <WritingDiv id="WritingDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <div className="title-box">
                <div className="title">글쓰기</div>
                <CategoryPicker className="categoryPicker" category={category}></CategoryPicker>
            </div>
            <div className="userInfo">
                    <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false"></input>
                    <input type="password" className="input password" placeholder="비밀번호"></input>
            </div>
            <Editor/>
            <div className="submit-box">
                <div className="btn-box">
                    <FiImage className="btn image" size="2rem" />
                    <FaYoutubeSquare className="btn youtube" size="1.9rem" onClick={openModal}/>
                    <BiHeartSquare className="btn emoticon" size="2.1rem"/>
                </div>
                <button className="submit">완료</button>
            </div>
            <div className="guide">
              <p>사진은 최대 10개까지 업로드 가능합니다.</p><p>쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉽습니다.</p>
            </div>
            {visible && <YoutubeModal visible={visible} setVisible={setVisible}/>}
        </WritingDiv>
    );
    };


export default WritePost;

const WritingDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  font-size: 12px;

  *{
    margin:0;
  }

  .community__top{
    width: 100%;
    height: auto;
  }

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

  .guide {
    width: 90%;
  }

  .guide p {
    margin-bottom: 2px;
  }
`;
