import React, {useState} from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const MainNav = () => {

    const [menu, setMenu] = useState(0);

    return (
        <MainNavDiv>
            <ul className="nav__main">
                <li className='community menu' onClick={()=> setMenu(0)}>
                    <Link to="community" className="menuLink">커뮤니티</Link>
                </li>
                <li className={`${menu === 1? 'battle menu active': 'battle menu'}`} onClick={()=> setMenu(1)}>
                    <Link to="/" className="menuLink">코인궁예대전</Link>
                </li>
                <li className={`${menu === 2? 'temperature menu active': 'battle menu'}`} onClick={()=> setMenu(2)}>
                <Link to="/" className="menuLink lastItem">코인체감온도</Link>
                </li>
            </ul>
        </MainNavDiv>
    );
}

const MainNavDiv = styled.div`
    width: 100%;
    height: 30px;
    background-color: #27272A;

    font-size: 0; //공백 해결

    .nav__main{
        display: grid;
        grid-template-rows: 30px;
        grid-template-columns: repeat(3, 1fr);

        width: 100%
        height: 100%

        margin:0;
        padding:0;
    }

    .active {
        background-color: #EA622F;
    }
    .menu{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style:none;
    }

    .menuLink{
        width: 100%;
        text-decoration: none;
        color: ${(props) => props.theme.colors.text};
        font-size:12px;
        font-weight: bold;
        border-right: 1px solid #888888;
        text-align: center;
        padding-top: 3px;
    }
    
    .menuLink.lastItem{
        border-right: 0px solid;
    }
`;

export default MainNav;