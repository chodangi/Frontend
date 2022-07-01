import React, {useState, useEffect} from "react";
import styled from "styled-components";

import { Date, Time } from "../Time";
import api from "../../api/api";
import { TierCircle } from "../TierCircle";
import { AiOutlineClose } from "react-icons/ai";
import { BsReplyFill } from "react-icons/bs";
import PasswordField from "../PasswordField";

const Comment = ({commentDto, forceUpdate, setReplyComment, moveToEditor, isDeleted}) => {

    console.log(commentDto);

    //로그인여부
    const jwt = localStorage.getItem('user');
    const user = useState(jwt ? true : false);

    let currentUserId;

    useEffect(()=>{
        if(user[0] == true) {
            fetch(`https://www.coinfortal.com:8080/profile/my-settings`, {
                method: 'GET',
                headers: {
                    jwt: jwt,
                },
            }).then((response) => {
                response.json().then((data) =>{  
                currentUserId = data.data?.id;
            })
        })}
    },[user])


    //댓글답댓글여부
    const reply = commentDto.level === 1;

    //댓글작성자의 회원여부
    let commentWriter = commentDto.password === "" ? 'user' : 'non-user';
    
    //회원댓글삭제
    const deleteComment = async(e) => {
        e.stopPropagation();
        if(commentDto.userId == currentUserId){ 
            await api.put(`comment/${commentDto.id}`);
            forceUpdate();
        } else {
            alert('삭제할 수 없습니다.');
            return
        }

    }

    //비회원댓글삭제
    const[password, setPassword] = useState();
    const [visible, setVisible] = useState(false);

    const openPasswordField = (e) => {
        if(visible) setVisible(false);
        else setVisible(true);
    }

    const deleteCommentByGuest = (e) => {
        e.stopPropagation();
        if(password == commentDto.password){
            fetch(`https://www.coinfortal.com:8080/comment/${commentDto.id}`, {
                method: 'PUT',
            }).then(() => {
                forceUpdate();
                setPassword('');
                setVisible(false);
            })
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    const goEditor = () => {
        setReplyComment({group: commentDto.commentGroup, writer: commentDto.nickname});
        moveToEditor();
    }
    
    return (
        <CommentDiv onClick={goEditor}>
            {reply && <BsReplyFill className="reply" size="1rem"/>}
            <div className="container">
                <div className="top">
                    <div className="writer">
                        <TierCircle point={commentDto.userPoint} size="small"></TierCircle>
                        <div className="writer-nickname">{commentDto.nickname}</div>
                    </div>
                    <div className="box">
                        <div className="date">{Date(commentDto.createdAt)}</div>
                        <div className="time">{Time(commentDto.createdAt)}</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="content">{isDeleted ? "삭제된 댓글" : commentDto.content}</div>
                    {!isDeleted && <AiOutlineClose className="delete" size="1rem" onClick={ commentWriter === 'user' ? deleteComment : openPasswordField}/>}
                </div>
            </div>
            {
                visible && 
                <div className="modal">
                    <PasswordField password={password} setPassword={setPassword} setVisible={setVisible} editOrDeleteByGuest={deleteCommentByGuest}/>
                </div>
            }
        </CommentDiv>
    );
}


const CommentDiv = styled.div`

    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 60px;
    padding: 10px 20px 5px 20px;
    font-size: 12px;
    border-bottom: 2px solid #444444;

    .reply {
        transform: rotate(180deg);
        margin-right: 3px;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .writer {
        display: flex;
    }

    .arrow {
        transform: scaleY(-1);
    }

    .box {
        display: flex;
        color : #9E9E9E;
    }

    .date {
        margin-right: 7px;
    }

    .bottom {
        display: grid;
        width: 100%;
        max-width: 100%;
        grid-template-columns: auto 30px;
	    //column-gap: 30px;
        padding-top: 5px;
    }

    .content {
        display:block;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        justify-self: start;
    }

    .delete {
        justify-self: end;
    }

    .modal {
        position:absolute;
        right: 50px;
    }
`

export default Comment;