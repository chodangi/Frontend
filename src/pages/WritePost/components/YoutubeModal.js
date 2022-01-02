import styled from "styled-components";
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai';

const YoutubeModal = (props) => {

    return ( 
        <ModalDiv>
            <div className="search">
                <input className="search-bar" placeholder="유튜브 동영상 검색"></input>
                <AiOutlineSearch className="search-icon" size="1.2rem" />
            </div>
            <AiOutlineClose className="close-icon" size="1.2rem" onClick={()=> props.setVisible(false)}/>
            <button className="cancel" onClick={()=> props.setVisible(false)}>취소</button>
        </ModalDiv>
    );
}

const ModalDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50px;
    width: 90%;
    height: 60%;
    z-index: 100;
    background-color: #27272A;

    .search {
        width: 80%;
        display: flex;
        background-color: #E0E0E0;
        margin-top: 10px;
        padding-right: 5px;
    }

    .search-bar {
        width: 100%;
        height: 20px;
        background-color: #E0E0E0;
        border: none;

    }

    .search-icon {
        height: 20px;
        background-color: #E0E0E0;
        color: #404040;
    }

    .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .cancel {
        position: absolute;
        bottom: 10px;
        width: 50px;
        height: 25px;
        background-color: #5E5E5E;
        color: #E0E0E0;
        border-color: transparent;
        border-radius: 5px;
    }
`

export default YoutubeModal;