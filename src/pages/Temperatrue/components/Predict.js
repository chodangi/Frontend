import styled from "styled-components";

const Predict = () => {
    return (
        <PredictDiv>
            <ButtonDiv>Sell</ButtonDiv>
            <ButtonDiv>Buy</ButtonDiv>
        </PredictDiv>
    );
}

const ButtonDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;

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