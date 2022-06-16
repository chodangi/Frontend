import React, {useState} from "react";
import styled from "styled-components";

import { Date, Time } from "../Time";
import api from "../../api/api";
import TierCircle from "../TierCircle";
import {AiOutlineClose} from "react-icons/ai";
import {BsReplyFill} from "react-icons/bs";

const Comment = ({commentDto, forceUpdate, setReplyComment, moveToEditor}) => {

    const reply = commentDto.level === 1;

    const deleteComment = async() => {
        await api.put(`comment/${commentDto.id}`);
        forceUpdate();
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
                    <div className="content">{commentDto.content}</div>
                    <AiOutlineClose className="delete" size="1rem" onClick={deleteComment}/>
                </div>
            </div>
        </CommentDiv>
    );
}

/*{postObj.comment.re && <IoArrowRedoSharp className="arrow" size="1rem"/> } */
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
`

export default Comment;