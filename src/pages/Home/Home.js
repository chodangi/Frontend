import React from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import ProgressBar from "../../components/ProgressBar";
import SearchBar from "../../components/SearchBar";
import Banner from "./components/Banner";
import BoardBox from "./components/BoardBox";
import RankingBox from "./components/RankingBox";
import TemperatureBox from "./components/TemperatureBox";

const Home = (props) => {

    return (
        <HomeDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
            <MainNav/>
            <Banner/>
            <TemperatureBox/>
            <BoardBox/>
            <RankingBox/>
            <SearchBar/>
            <Footer/>
        </HomeDiv>
    );
}

const HomeDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;

    max-width: 600px;
    width: 100vw;
`

export default Home;