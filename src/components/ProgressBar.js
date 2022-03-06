import styled from "styled-components";

const ProgressBar = (props) => {


    const barStyle = {
        width: `${props.percent}%`,
        height: '100%',
        background: '#3498DB',
        borderRadius: '10px',
    }

    return (
        <BarDiv>
            <div className="progress" style={barStyle}/>
        </BarDiv>
    );
}

export default ProgressBar;

const BarDiv = styled.div`
    width: 300px;
    height: 23px;
    background-color: #E0E0E0;
    border-radius: 10px;

`
