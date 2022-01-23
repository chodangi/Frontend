import React, {useState} from "react";
import styled from "styled-components";

const RankingBox = () => {

    return (
        <RankingBoxDiv>
            <div className="top">
                <div className="point-ranking">POINT RANKING</div>
                <div className="sort">
                    <div className="button">부자 순</div>
                    <div className="button">그지 순</div>
                </div>
            </div>
            <div className="rank-container">
                <Rank/>
                <hr width="100%" size="1" noshade="true" style={{margin: 0}}/>
                <Rank/>
                <hr width="100%" size="1" noshade="true" style={{margin: 0}}/>
                <Rank/>
                <hr width="100%" size="1" noshade="true" style={{margin: 0}}/>
                <Rank/>
                <hr width="100%" size="1" noshade="true" style={{margin: 0}}/>
                <Rank/>
            </div>
            <div className="save-button">포인트 적립</div>
        </RankingBoxDiv>
    )
}

const Rank = ( props ) => {

    return (
        <RankDiv>
            <div className="rank">1</div>
            <div className="name">김익명</div>
            <div className="point">33333</div>
            <div className="tier">부자 99</div>
        </RankDiv>
    )
}

const RankingBoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 250px;
    background: #27272A;
    border-radius: 5px;

    margin: 15px 0px;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        margin-top: 10px;
    }
    
    .point-ranking {
        font-size: 20px;
        font-weight: bold;
    }

    .sort {
        display: flex;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 60px;
        height: 25px;
        margin-left: 15px;
        padding-bottom: 1px;
        background: #EA622F;
        font-size: 11px;
        font-weight: bold;
        word-spacing: -1px;
        border-radius: 7px;
    }

    .rank-container {
        width: 95%;
        margin-top: 2px;
    }

    .save-button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 70%;
        height: 28px;
        margin-top: 10px;
        font-size: 15px;
        font-weight: bold;
        color: #F1C40F;
        border-radius: 5px;
        background: #676770;
    }

`
const RankDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;

    width: 100%;
    height: 30px;

    font-size: 16px;
    font-weight: bold;

    .rank {
        display: flex;
        justify-content: center;
        width: 50px;
    } 
`
//랭크 옆 화살표 나중에..
export default RankingBox;