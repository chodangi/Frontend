import styled from "styled-components";

const Notice = () => {

    return (
        <NoticeDiv>
            <div className="title">코인체감온도</div>
            <div className="content">코인체감온도에서는 주요 코인들에 대해 유저들과 토론할 수 있습니다. 코인별 온도계를 터치하시면 해당 코인의 전망에 대해 평가를 내려 온도계를 올리거나 낮출 수 있고, 다른 유저들의 전망을 검토하거나 내 의견을 공유할 수 있습니다.</div>
        </NoticeDiv>
    );
}

const NoticeDiv = styled.div`
    width: 90%;
    margin: 32px 0px;

    .title {
        font-size: 25px;
        font-weight: bold;
    }

    .content {
        font-size: 15px;
        margin-top: 7px;
    }
`

export default Notice;