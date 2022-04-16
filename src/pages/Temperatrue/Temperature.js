import React from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import Description from "./components/Description";
import TemperatureBox from "./components/TemperatureBox";

const Temperature = (props) => {

    const contentHeight = (window.innerHeight - 80) + "px" ;
    
    return (
        <TemperatureDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
            <MainNav/>
            <div className="content" style={{minHeight: contentHeight}}>
                <Description/>
                <TemperatureBox type={"bit"}/>
                <TemperatureBox type={"eth"}/>
                <TemperatureBox type={"rip"}/>
                
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
