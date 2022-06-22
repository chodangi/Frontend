import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import {AiOutlineHeart} from 'react-icons/ai';
import { Date, Time } from "../../../components/Time";

const BoardBox = () => {

    const [menu, setMenu] = useState(0);
    const [postList, setPostList] = useState([]);

    useEffect(()=>{

        axios({
            method: "get",
            url: "http://www.coinfortal.com:8080/community/posts",
            headers: {'Content-Type': "application/json;charset=UTF-8"},
      
          }).then((response) => {
                console.log(response.data);
                if(menu == 0){
                    setPostList(()=>
                        Object.values(response.data.data).filter((p)=>{ return (p.status == 'A' && (p.boardName == '자유게시판' || p.boardName == '부자게시판' || p.boardName == '그지게시판') && p.upCnt >= 10 )}).slice(0,4)
                    )
                } else if(menu == 1){
                    setPostList(()=>
                        Object.values(response.data.data).filter((p)=>{ return (p.status == 'A' && p.boardName == '자유게시판' )}).slice(0,4)
                    )
                } else if(menu == 2){
                    setPostList(()=>
                        Object.values(response.data.data).filter((p)=>{ return (p.status == 'A' && p.boardName == '부자게시판' )}).slice(0,4)
                    )
                } else if(menu == 3){
                    setPostList(()=>
                        Object.values(response.data.data).filter((p)=>{ return (p.status == 'A' && p.boardName == '그지게시판' )}).slice(0,4)
                    )
                }              
                //setPostList(Object.values(response.data.data).filter((p)=>{ return (p.status == 'A' && (p.boardName == '자유게시판' || p.boardName == '부자게시판' || p.boardName == '그지게시판'))}).slice(0,4))
                console.log(postList.filter((p)=>{return p.boardName == "자유게시판"}));
            })
            .catch((error) => {
                  console.log(error);
        })
    },[menu])

    const navigate = useNavigate();
    
    const goCommunity = () => {
        if(menu == 0){
            navigate('/popular')
        } else if(menu == 1){
            navigate('/free')
        } else if(menu == 2){
            navigate('/rich')
        } else if(menu == 3){
            navigate('/poor')
        }
    }


    return(
        <BoardBoxDiv>
            <div className="board-menu">
                <div className={`${menu === 0? 'board-item active': 'board-item'}`} onClick={()=> setMenu(0)}>인기</div>
                <div className={`${menu === 1? 'board-item active': 'board-item'}`} onClick={()=> setMenu(1)}>자유</div>
                <div className={`${menu === 2? 'board-item active': 'board-item'}`} onClick={()=> setMenu(2)}>부자</div>
                <div className={`${menu === 3? 'board-item active': 'board-item'}`} onClick={()=> setMenu(3)}>그지</div>
            </div>
            <div className="post-container">
                <div className="top">
                    <div className="button">실시간 인기글</div>
                    <div className="button more" onClick={goCommunity}>more</div>
                </div>
                <div className="bottom">
                    {postList.map((p)=> {
                        return (
                            <Link to={`/showPost/${p.id}`} key={p.id} className="link"><Post post={p} /></Link>
                        )
                    })}   
                </div>
            </div>
        </BoardBoxDiv>
    );
}

const Post = ({post}) => {
    return (
        <PostDiv>
            <div className="board">{post.boardName?.substring(0,2)}</div>
            <div className="title">{post.content} ({post.comments.length})</div>
            <div className="heart">
                <AiOutlineHeart size="0.8rem" color="red"/>
                <div className="heart-num">{post.upCnt}</div>
            </div>
            <div className="time">{post.createdAt.substring(5,7)}/{post.createdAt.substring(8,10)} {Time(post.createdAt)}</div>
        </PostDiv>
    )
}

const BoardBoxDiv = styled.div`
    width: 95%;
    margin-top: 15px;

    .board-menu {
        display: grid;
        grid-template-rows: 25px;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }

    .board-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #404040;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        font-size: 11px;
    }

    .board-item.active {
        background: #27272A;
    }

    .post-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #27272A;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .top {
        display: flex;
        justify-content: space-between;
        width: 95%;
        margin-top: 15px;
        padding-bottom: 4px;
        border-bottom: 2px solid #444444;
    }

    .button {
        display: flex;
        align-items: center;
        height: 22px;
        background: #EA622F;
        font-size: 14px;
        border-radius: 5px;
        padding: 0px 10px 1px 10px;
    }

    .button.more {
        padding-bottom: 3px;
    }

    .bottom {
        width: 95%;
        height: 240px;

    }

    .link {
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
    }

`

const PostDiv = styled.div`
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 2fr 6fr 3fr;
    width: 100%;
    height: 60px;

    padding: 10px 0px;
    font-size: 12px;

    .board {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-row: 1;
        width: 42px;
        height: 21px;
        padding-bottom: 2px;
        font-size: 11px;
        font-weight: bold;
        background: #404040;
        border-radius: 5px;
    }

    .title {
        text-overflow: ellipsis;;
    }

    .heart {
        display: flex;
        align-items: center;
        grid-row: 2;
        grid-column: 2;
        width: 50px;
    }

    .heart-num {
        margin-left: 1px;
    }

    .time {
        justify-self: end;
        grid-row: 1;
        grid-column: 3;
        padding-right: 10px;
    }
`

export default BoardBox;