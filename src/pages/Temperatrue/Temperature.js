import React,{useEffect,useState} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import Description from "./components/Description";
import TemperatureBox from "./components/TemperatureBox";
import api from "../../api/api";

const Temperature = (props) => {

    const navigate = useNavigate(); 
    const contentHeight = (window.innerHeight - 80) + "px" ;
    const TemperatrueList = ["BTC","ETH","XRP"]
    const [Temperature, setTemperature] = useState([50,50,50])
    
      const showAllPost = async () => {
        const { data } = await api.get('/temper/coin-temper')
        setTemperature(data)
    }

      useEffect(() => {
        showAllPost()
      }, [])

    const onClickHandler = (e)=>{
        navigate(`/temperatureComment/${e}`)
    }
      
    return (
        <TemperatureDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
            <MainNav/>
            <div className="content" style={{minHeight: contentHeight}}>
                <Description/>
                {TemperatrueList.map((item,index)=>(
                    <TemperatureBox type={item} temper={Temperature[index]} key={item} onPress={() => onClickHandler(item)}/>
                ))}
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
    max-width: 600px;

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
