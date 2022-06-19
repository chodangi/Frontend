import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { pointToTier } from "../../../components/TierCircle";

const RankingBox = () => {

    const navigate = useNavigate();

    const [ordering, setOrdering] = useState('rich');

    const changeOrder = () => {
        if(ordering === 'rich')
            setOrdering('poor');
        else 
            setOrdering('rich');
    }

    const [ranking, setRanking] = useState([]);

    useEffect(()=>{
        fetch(`http://13.209.180.179:8080/game/ranking`, {
                method: 'GET',
            }).then((response) => {
                response.json().then((data) =>{  
                setRanking(data.data);
                })
            })
    },[])

    

    const makeRankingList = () => {
        let arr = [];

        const reverseRanking = [...ranking].reverse();

        if(ranking != 'undefined' && ranking != null) {
            for (let i = 0; i < 5; i++){
                arr.push(<Rank ranking={i+1} nickname={(ordering == 'rich') ? ranking[i]?.nickname : reverseRanking[i].nickname} point={(ordering == 'rich') ? ranking[i]?.point : reverseRanking[i]?.point} />)
            }
         }
        
        return arr;
    }
        


    return (
        <RankingBoxDiv>
            <div className="top">
                <div className="point-ranking">POINT RANKING</div>
                <div className="sort">
                    <div className={ordering === "rich" ? "button active" : "button"} onClick={changeOrder}>부자 순</div>
                    <div className={ordering === "poor" ? "button active" : "button"} onClick={changeOrder}>그지 순</div>
                </div>
            </div>
            <div className="rank-container">
                {makeRankingList()}
            </div>
            <div className="save-button" onClick={()=>navigate('/game')}>포인트 적립</div>
        </RankingBoxDiv>
    )
}

const Rank = ({ranking, nickname, point}) => {


    return (
        <RankDiv>
            <div className="container">
                <div className="rank">{ranking}</div>
                <div className="name">{nickname}</div>
                <div className="point">{point}</div>
                <div className="tier" style={{color: (point >= 1000) ? "red" : (point <= -1000) ? "blue" : "white"}}>{(point >= 1000) ? "부자" : (point <= -1000) ? "그지" : "중산층"}  {pointToTier(point)}</div>
            </div>
            {(ranking != 5) && <hr width="100%" size="1" noshade="true" style={{margin: 0}}/>}
        </RankDiv>
    )
}

const RankingBoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 270px;
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
        background: #404040;
        font-size: 11px;
        font-weight: bold;
        word-spacing: -1px;
        border-radius: 7px;
    }

    .button.active {
        background: #EA622F;
    }

    .rank-container {
        width: 95%;
        margin-top: 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 35px;

    .container {
        width: 100%;
        display: grid;
        grid-template-columns: 2fr 4fr 4fr 4fr;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .rank {
        display: flex;
        justify-content: center;
        width: 50px;
    } 

    .name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;;
    }
`
//랭크 옆 화살표 나중에..
export default RankingBox;