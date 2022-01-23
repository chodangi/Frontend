import styled from "styled-components";
import ProgressBar from "../../../components/ProgressBar";
import { MdDoubleArrow } from "react-icons/md"

const TemperatureBox = () => {

    return (
        <TempBoxDiv>
            <div className="temp-title">비트코인 체감온도</div>
            <ProgressBar percent={36.5}/>
            <div className="container">
                <div className="temp-num item">36.5 ºC</div>
                <MdDoubleArrow size="1.5rem" className="arrow item"/>
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

    width: 95%;
    height: 120px;
    background-color: #212121;

    font-size: 16px;

    .temp-title {
        margin: 10px 0px;
        width: 95%;
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
`

export default TemperatureBox;