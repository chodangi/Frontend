import styled from "styled-components";

import { Link } from 'react-router-dom';

const Navigator = () =>{

    return (
        <NavDiv>
            <ul className="nav__boards">
                <li className="popular board">
                    <div className="highlight"/>
                    <Link to="/" className="boardLink">인기게시판</Link>
                </li>
                <li className="free board">
                    <Link to="/" className="boardLink">자유게시판</Link>
                </li>
                <li className="rich board">
                    <Link to="/" className="boardLink">부자게시판</Link>
                </li>
                <li className="poor board">
                <Link to="/" className="boardLink lastItem">그지게시판</Link>
                </li>
            </ul>
        </NavDiv>
    );
}

const NavDiv = styled.div`
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

    .highlight{
        width: 100%;
        height: 3px;
        background-color: #EA622F;
    }

    .popular .boardLink{
        color: #EA622F;
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
    
    .boardLink.lastItem{
        border-right: 0px solid;
    }
`;


export default Navigator;