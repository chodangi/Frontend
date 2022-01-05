import React from "react";
import styled from "styled-components";
import { BiHeartSquare } from "react-icons/bi";
import Editor from "../../../components/Editor";

const WriteComment = () => {

    return (
        <WritingCommentDiv>
            <div className="input-box">
                <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false"></input>
                <input type="password" className="input password" placeholder="비밀번호"></input>
            </div>
            <div></div>
            <Editor className="editor" type='comment'/>
            <div className="submit">
                <BiHeartSquare className="emoticon" size="1.6rem"/>
                <div className="submit-btn">등록</div>
            </div>
        </WritingCommentDiv>
    );
 }

const WritingCommentDiv = styled.div`

    width: 100%;

    .input-box {
        width: 100%;
        border-bottom: 2px solid #444444;
    }

    .input {
        width
        height: 30px;
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.colors.text}; 
        font-size: 12px;
        padding-left: 20px;
    }

    .input.nickname{
        width: 135px;
        border-right: 2px solid #444444;
    }

    .input.password{
        width: 160px; //닉네임이랑 비밀번호 너비 조정 필요 나중에 비율로 주기
    }

    .editor {
        min-height: 90px;
    }

    .submit {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 20px;
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 20px;
        background-color: #3498DB;
        border-radius: 5px;
    }
`

export default WriteComment;