import styled from "styled-components";
import ToggleTheme from "../pages/Community/components/ToggleTheme";
import { Link } from "react-router-dom";

const Header = (props) => {

  return (
    <HeaderDiv>
        <Link to="/"><img className="logo__img" src="undefined"></img></Link>
        <div className="header__item">
            <div className="login">Login</div>
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

    .login{
        width: 45px;
        height: 20px;
        padding-right: 5px;
        font-size: 12px;
        font-weight: bold;
    }

    .logo__img {
        width: 100px;
        height: 30px;   
    }
`;
