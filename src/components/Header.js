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
            <Link to="/"><img className="logo__img" src={process.env.PUBLIC_URL+"/img/logo.png"} alt=""></img></Link>
            <div className="header__item">
                <Link to={isLoggedIn ? "/myPage" : "/signIn"}><div className="login">{isLoggedIn ? 'MyPage' : 'LOGIN'}</div></Link>
                
            </div>
        </HeaderDiv>
    );
};

/*<ToggleTheme theme={props.theme} darkModeHandler={props.darkModeHandler} />*/
export default Header;

const HeaderDiv = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;    
    width: 100%;
    height: 50px;
    padding: 0px 12px 0px 12px; 
    
    background-color: #27272A;

    .header__item{
        display: flex;
    }

    .login {
        width: 60px;
        height: 25px;
        padding: 3px 0px 5px 0px;
        color: lightgray;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
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
