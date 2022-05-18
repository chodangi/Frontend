import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { BsFillShareFill } from "react-icons/bs"
import { MdReport} from "react-icons/md"
import { Date, Time } from "../../../components/Time";

const Content = ({post}) => {

    const navigate = useNavigate();

    //로그인여부
    const jwt = localStorage.getItem('user');
    const user = useState(jwt ? true : false)

    //수정, 삭제
    const [visible, setVisible] = useState(false);

    const openPasswordField = () => {
        if(visible) setVisible(false);
        else setVisible(true);
    }

    const deletePost = async () => {

        const url = "http://13.209.180.179:8080/community/post/" + post.id
        try {await fetch(url, {
          method: 'DELETE',
          headers: {
            jwt: jwt,
          },})
          .then((response)=> {
            console.log(response)
            navigate(-1);
          })}
        catch (error){
            console.error(error);
        }

      }

    return (
        <ContentDiv>
            <div className="board-name">
                <div>{post.boardName}</div>
            </div>
            <div className="post-info">
                <div className="top box">
                    <div className="title">{post.content}</div>
                    <div className="date">{Date(post.createdAt)}</div>
                </div>
                <div className="bottom box">
                    <div className="user box">
                        <div className="user-tier">99</div>
                        <div className="user-nickname"> {post.userNickname}</div>
                    </div>
                    <div className="time">{Time(post.createdAt)}</div>
                </div>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="like">
                <div className="up circle" >떡상</div>
                <div className="down circle">손절</div>
            </div>
            <div className="line">
                <div className="url"><BsFillShareFill className="icon" size="1.1rem" color="#ffffff"/>URL 복사</div>
                <div className="report"><MdReport className="icon" size="1.3rem" color="red"/>신고</div>
            </div>
            <div className="modify-delete">
                <div className="modify button" onClick={openPasswordField}>수정</div>
                <div className="delete button" onClick={jwt ? deletePost : openPasswordField}>삭제</div>
            </div>
            {visible ? 
                <div className="password-field">
                    <div>비밀번호를 입력하세요.</div>
                    <input type="password"/>
                    <div className="button">확인</div>
                </div> 
                : 
                <></> 
            }
        </ContentDiv>
    );
}

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    font-size: 12px;

    .post-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        padding: 2px 10px 2px 10px;
        border-top: 2px solid #444444;
        border-bottom: 2px solid #444444;
        color: #9E9E9E;
    }

    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-weight: bold;
        color: ${(props) => props.theme.colors.text};
        width: 75%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user.box {
        padding: 0px;
    }

    .user-tier {
        display:flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-right:3px;
        border-radius: 50%;
        background-color: #3498DB; //나중에 티어별 적용 필요
        //font-size 티어가 세 자리수일 때 조정 필요
    }

    .post-content {
        width: 100%;
        min-height: 120px;
        padding: 10px 20px 10px 20px;
        word-wrap: break-word; //자동줄바꿈
    }  

    .like {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 45px;
        margin-bottom: 10px;
    }

    .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 45px;
        border-radius: 90%;
        background-color: gray;
    }

    .circle.up {
        margin-right: 30px;
    }

    .line {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20px;
        color: #9E9E9E;
    }

    .url {
        display: flex;
        align-items: center;
    }

    .report {
        display: flex;
        align-items: center;
    }
    
    .url {
        margin-right: 8px;
    }

    .icon {
        margin-right: 2px;
    }

    .modify-delete {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-top: 15px;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 20px;
        //margin-right: 20px;
        background-color: #404040;
        border-radius: 5px;
    }

    .delete {
        margin: 0px 20px;
    }

    .password-field {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: absolute;
        //top: 50px;

        width: 250px;
        height: 100px;
        background-color: blue;
    }

`

export default Content;