import { useState, useEffect } from "react";
import styled from "styled-components";
import ProgressBar from "../../../components/ProgressBar";
import { HiOutlineChevronDoubleRight } from "react-icons/hi"

const TemperatureBox = (props) => {

    const btc = { type: "비트코인"};
    const eth = { type: "이더리움"};
    const xrp = { type: "리플"};
    const ada = { type: "에이다"};
    const sol = { type: "솔라나"};
    const dog = { type: "도지코인"};
    const dot = { type: "폴카닷"};
    const trx = { type: "트론"};
    const dai = { type: "다이"};
    const avx = { type: "아발란체"};
    const wmx = { type: "위믹스"};
    const rep = { type: "어거"};
    const etc = { type: "이더리움 클래식"};
    const btg = { type: "비트코인 골드"};
    const [Type, setType] = useState(btc)

    const noBackgroundStyle = {
        width: '100%',
        background: 'none',
    }

    useEffect(() => {
      switch(props.type){
          case "BTC" : setType(btc); break;
          case "ETH" : setType(eth); break;
          case "XRP" : setType(xrp); break;
          case "ADA" : setType(ada); break;
          case "SOL" : setType(sol); break;
          case "DOG" : setType(dog); break;
          case "DOT" : setType(dot); break;
          case "TRX" : setType(trx); break;
          case "DAI" : setType(dai); break;
          case "AVX" : setType(avx); break;
          case "WMX" : setType(wmx); break;
          case "REP" : setType(rep); break;
          case "ETC" : setType(etc); break;
          case "BTG" : setType(btg); break;
      }
    }, [])
    

    return (
            <TempBoxDiv style={props.noBackground && noBackgroundStyle} onClick={props.onPress}>
                <div className="temp-title" >{Type.type} 체감온도</div>
                <ProgressBar percent={props.temper}/>
                <div className="container">
                    <div className="temp-num item">{props.temper} ºC</div>
                    {props.noBackground || <HiOutlineChevronDoubleRight size="1.5rem" className="arrow item"/>}
                </div>
            </TempBoxDiv>
    );
}

const TempBoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    margin-top: 15px;
    cursor:pointer;

    width: 95%;
    height: 120px;
    background-color: #212121;

    font-size: 16px;

    .temp-title {
        margin: 13px 0px;
        width: 95%;
        font-size: 17px;
        font-weight: bold;
    }

    .container {
        display: grid;
        grid-template-rows: 2fr 1fr;
        grid-template-columns: 9fr 1fr;
        align-items: center;
        width: 100%;
        
    }

    .temp-num {
        display: flex;
        grid-column: 1/3;
        grid-row: 1;
        justify-content: center;
        margin-top: 10px;
    }

    .arrow {
        grid-column: 2;
        grid-row: 1/3;
        margin-top: 20px;
    }

    link {
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

export default TemperatureBox;