import React, {useState} from "react";
import styled from "styled-components";
import { NavLink } from 'react-router-dom';

const MainNav = () => {

    const [menu, setMenu] = useState(0);
    

    return (
        <MainNavDiv>
            <ul className="nav__main">
                <li>
                    <NavLink to="/board/popular" className="community menu" activeclassname="active"> 커뮤니티 </NavLink>
                </li>
                <li>
                    <NavLink to="/game" className="battle menu" activeclassname="active"> 코인궁예대전 </NavLink>
                </li>
                <li>
                    <NavLink to="/temperature" className="temperature menu last" activeclassname="active"> 코인체감온도 </NavLink>
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
        width: 100%;
        height: 100%;
        list-style:none;
        font-size:12px;
        font-weight: bold;
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
        text-align: center;
        border-right: 1px solid #888888;
    }

    
    
    .menu.last{
        border-right: 0px solid;
    }
`;

export default MainNav;