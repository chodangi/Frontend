import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import TemperatureBox from "./components/TemperatureBox";
import Predict from "./components/Predict";

const TemperatureComment = (props) => {

    const contentHeight = (window.innerHeight - 80) + "px" ;
    
    const category = useLocation().state.type;
    //클릭해서 type받아오는 것보다 경로로 type주는게 훨씬 낫겠다.

    return (
        <TemperatureCommentDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
            <MainNav/>
            <div className="content" style={{minHeight: contentHeight}}>
                <TemperatureBox type={category} noBackground={true}/>
                <Predict/>
            </div>
            <Footer/>
        </TemperatureCommentDiv>
    );
}

const TemperatureCommentDiv = styled.div`
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
    
`

export default TemperatureComment;
