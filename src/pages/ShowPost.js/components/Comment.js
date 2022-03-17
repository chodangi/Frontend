import React from "react";
import styled from "styled-components";
import { IoArrowRedoSharp } from "react-icons/io5"

const Comment = ({post}) => {

    return (
        <CommentDiv>
            <div className="top">
                <div className="writer">
                    
                    <div className="writer-tier">99</div>
                    <div className="writer-nickname">닉네임</div>
                </div>
                <div className="box">
                    <div className="date">date</div>
                    <div className="time">time</div>
                </div>
            </div>
            <div className="content">{post.content}</div>
        </CommentDiv>
    );
}

/*{postObj.comment.re && <IoArrowRedoSharp className="arrow" size="1rem"/> } */
const CommentDiv = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 60px;
    padding: 10px 20px 5px 20px;
    font-size: 12px;
    border-bottom: 2px solid #444444;

    .top {
        display: flex;
        justify-content: space-between;
    }

    .writer {
        display: flex;
    }

    .arrow {
        transform: scaleY(-1);
    }

    .writer-tier {
        display:flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border-radius: 50%;
        background-color: #3498DB; //나중에 티어별 적용 필요
        //font-size 티어가 세 자리수일 때 조정 필요
    }

    .box {
        display: flex;
        color : #9E9E9E;
    }

    .date {
        margin-right: 7px;
    }
`

export default Comment;