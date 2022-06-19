import styled from "styled-components";
import api from "../../../api/api";

const Predict = ({getPercent, type}) => {
    const jwtToken = localStorage.getItem('user')

    const trade = async (url)=>{
        if (jwtToken) {
            await api.get(url)
            const { data } = await api.get('/temper/coin-temper')
            getPercent(data)
        }
    }

    const onBuyHandler = async () => {
        trade(`/temper/up/${type}`)
    }

    const onSellHandler = async()=>{
        trade(`/temper/down/${type}`)
    }

    return (
        <PredictDiv>
            <ButtonDiv onClick={onSellHandler}>Sell</ButtonDiv>
            <ButtonDiv onClick={onBuyHandler}>Buy</ButtonDiv>
        </PredictDiv>
    );
}

const ButtonDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    cursor:pointer;

    width: 40%;
    height: 100%;
    padding-bottom: 1px;

    background-color: #404040;
    border-radius: 5px;
    font-size: 14px;
`

const PredictDiv = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: 60%;
    height: 28px;

    .title {
        font-size: 25px;
        font-weight: bold;
    }

    .content {
        font-size: 15px;
        margin-top: 7px;
    }
`

export default Predict;