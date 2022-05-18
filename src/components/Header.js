import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToggleTheme from "./ToggleTheme";
import { Link } from "react-router-dom";

const Header = (props) => {
    const [isLoggedIn, setInLoggedIn] = useState(false)
    
    useEffect(() => {
        const token = localStorage.getItem('user')
        setInLoggedIn(token === null ? false : true)
    }, []);

    return (
        <HeaderDiv>
            <Link to="/"><img className="logo__img" src="img/logo.png"></img></Link>
            <div className="header__item">
                <Link to={isLoggedIn ? "/myPage" : "/signIn"}><div className="login">{isLoggedIn ? 'MyPage' : 'SignIn'}</div></Link>
                <ToggleTheme theme={props.theme} darkModeHandler={props.darkModeHandler} />
            </div>
        </HeaderDiv>
    );
};

export default Header;

const HeaderDiv = styled.div`
    display: flex;
    justify-content:space-between;
    align-items:center;    
    width: 100%;
    height: 50px;
    padding: 0px 12px 0px 12px; 
    
    background-color: #27272A;

    .header__item{
        display: flex;
    }

    .login {
        width: 50px;
        height: 20px;
        padding: 3px 5px 0px 0px;
        color: lightgray;
        font-size: 13px;
        font-weight: bold;
    }

    a:link {
        text-decoration: none;
    }

    .logo__img {
        width: 120px;
        height: 50px;
        object-fit: cover;   
    }
`;
