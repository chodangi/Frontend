import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { NavLink } from 'react-router-dom';

const Navigator = () =>{

    return (
        <BoardNavDiv>
            <ul className="nav__boards">
                <li className="popular board" >
                    <NavLink to="/board/popular" className="boardLink" activeclassname="active"> 인기게시판 </NavLink>
                </li>
                <li className="free board">
                    <NavLink to="/board/free" className="boardLink" activeclassname="active"> 자유게시판 </NavLink>
                </li>
                <li className="rich board">
                    <NavLink to="/board/rich" className="boardLink" activeclassname="active"> 부자게시판 </NavLink>
                </li>
                <li className="poor board">
                    <NavLink to="/board/poor" className="boardLink" activeclassname="active"> 그지게시판 </NavLink>
                </li>
            </ul>
        </BoardNavDiv>
    );
}

const BoardNavDiv = styled.div`
    width: 100%;
    height: 30px;
    background-color: #27272A;

    font-size: 0; //공백 해결

    .nav__boards{
        display: grid;
        grid-template-rows: 30px;
        grid-template-columns: repeat(4, 1fr);

        width: 100%
        height: 100%

        margin:0;
        padding:0;
    }
    
    .board{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style:none;
    }

    .boardLink{
        width: 100%;
        text-decoration: none;
        color: ${(props) => props.theme.colors.text};
        font-size:12px;
        font-weight: bold;
        border-right: 1px solid #888888;
        text-align: center;
        padding-top: 3px;
    }

    .boardLink.active {
        color: #EA622F;
    }
    
    .boardLink.lastItem{
        border-right: 0px solid;
    }
`;


export default Navigator;