import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import api from "../../api/api";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import ProgressBar from "../../components/ProgressBar";
import SearchBar from "../../components/SearchBar";
import Banner from "./components/Banner";
import BoardBox from "./components/BoardBox";
import RankingBox from "./components/RankingBox";
import TemperatureBox from "../Temperatrue/components/TemperatureBox";

const Home = (props) => {

    //온도
    const navigate = useNavigate(); 
    const [TemperatureList, setTemperatureList] = useState([])
    const [Temperature, setTemperature] = useState([])
    
      const showAllPost = async () => {
        const { data } = await api.get('/temper/coin-temper')
        setTemperature(Object.values(data))
        setTemperatureList(Object.keys(data))
    }

      useEffect(() => {
        showAllPost()
      }, [])

    const onClickHandler = (e)=>{
        navigate(`/temperatureComment/${e}`)
    }
    
    return (
        <HomeDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler} />
            <MainNav />
            <Banner />
            <TemperatureBox type={TemperatureList[0]} temper={Temperature[0]} onPress={() => onClickHandler(TemperatureList[0])}/>
            <BoardBox />
            <RankingBox />
            <SearchBar />
            <Footer />
        </HomeDiv>
    );
}

const HomeDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;

    max-width: 600px;
    width: 100vw;
    //padding-right : 10px;
    //중앙 정렬이 잘 되지 않음
`

export default Home;