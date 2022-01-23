import React, {useState} from "react";
import styled from "styled-components";
import {AiOutlineHeart} from 'react-icons/ai';

const BoardBox = () => {

    const [menu, setMenu] = useState(0);

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
                    <div className="button more">more</div>
                </div>
                <div className="bottom">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </BoardBoxDiv>
    );
}

const Post = () => {
    return (
        <PostDiv>
            <div className="board">자유</div>
            <div className="title">많이 올라왔네 (32)</div>
            <div className="heart">
                <AiOutlineHeart size="0.8rem" color="red"/>
                <div className="heart-num">30</div>
            </div>
            <div className="time">11/25 16:32</div>
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