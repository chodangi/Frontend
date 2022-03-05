import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import Description from "./components/Description";
import TemperatureBox from "../../components/TemperatureBox";

const Temperature = (props) => {

    const contentHeight = (window.innerHeight - 80) + "px" ;
    
    return (
        <TemperatureDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
            <MainNav/>
            <div className="content" style={{minHeight: contentHeight}}>
                <Description/>
                <Link to="/temperatureComment" state={{type: "bit"}} className="link">
                    <TemperatureBox type={"bit"}/>
                </Link>
                <Link to="/temperatureComment" state={{type: "eth"}} className="link">
                    <TemperatureBox type={"eth"}/>
                </Link>
                <Link to="/temperatureComment" state={{type: "rip"}} className="link">
                    <TemperatureBox type={"rip"}/>
                </Link>
            </div>
            <Footer/>
        </TemperatureDiv>
    );
}

const TemperatureDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;

    width: 100vw;

    .content {
        display:flex;
        flex-direction: column;
        align-items:center;

        width: 100%;
    }
    
    .link {
        display:flex;
        flex-direction: column;
        align-items:center;
        color: white;

        width: 100%;
        height: 100%;
        margin: 0;
        
        text-decoration: none;
    }
    
`

export default Temperature;
