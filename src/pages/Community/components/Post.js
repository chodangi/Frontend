import React,{useEffect} from "react";
import styled from "styled-components";

import {AiOutlineHeart} from 'react-icons/ai';
import {GiTalk} from 'react-icons/gi';

import TierCircle from "../../../components/TierCircle";
import { Time } from "../../../components/Time";

const Post = ({post}) => {

    return(
        <PostDiv>
            <hr width='100%' size='2' color='#444444' noshade="true" />
            <div className="post__contents">
                <div className="top line">
                    <div className="post__title">{post.content}</div>
                    <div className="part-right">
                            <div className="post__category">{post.boardName}</div>
                            <div className="post__date">{Time(post.createdAt)}</div>
                        </div>
                    </div>
                    <div className="bottom line">
                        <div className="post__user container">
                            <TierCircle point={post.userPoint} size="small"></TierCircle>
                            <div>{post.userNickname}</div>
                        </div>
                        <div className="part-right">
                            <div className="post__heart container">
                                <AiOutlineHeart className="heart icon"/>
                                <div>{post.upCnt}</div>
                            </div>
                            <div className="post__comment container">
                                <GiTalk className="talk icon"/>
                                <div>{post.comments?.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
        </PostDiv>
    );
}

export default Post;

const PostDiv = styled.div`
    width: 100%;
    height: 72px;
    font-size: 12px;
    
    *{
        align-items:center;
        justify-content:center;
    }

    hr {
        margin: 0;
    }

    .post__contents{
        height: 100%;
        padding: 10px 20px 15px 20px;
    }

    .line{
        display: flex;
        justify-content:space-between;
        align-items: center;
    }

    .top.line{
        height: 20px;
        margin-bottom: 15px;
    }

    .bottom.line{
        height: 15px;
    }

    .post__title{
        width: 220px;
        height: 20px;
        overflow: hidden;
        //white-space: nowrap;
        text-overflow: ellipsis;;
        font-size: 14px;
        font-weight: bold;
    }

    .part-right{
        display: flex;
    }

    .post__category{
        margin-right: 4px;
    }

    .post__user{
        display:flex;
    }

    .post__tier{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        height: 15px;
        margin-right:3px;
        border-radius: 50%;
        background-color: #3498DB; //나중에 티어별 적용 필요
        //font-size 티어가 세 자리수일 때 조정 필요
    }

    .post__heart{
        padding-right:8px;
    }

    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 15px;
    }

    .icon{
        width: 15px;
        height: 15px;
        margin-right: 3px;
    }

    .heart{
        color: red;
    }

`