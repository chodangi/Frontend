import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const PasswordField = ({password, setPassword, setVisible, editOrDeleteByGuest}) => {
        
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <PasswordFieldDiv>
            <AiOutlineClose className="modal-delete" size="1.2rem" onClick={()=>setVisible(false)}/>
            <div>비밀번호를 입력하세요</div>
            <div className="pass-bottom">
                <input type="password" className="pass-input" value={password} onChange={onChangePassword}/>
                <div className="pass-button" onClick={editOrDeleteByGuest}>확인</div>
            </div>
        </PasswordFieldDiv>
    )
};

const PasswordFieldDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 280px;
    height: 80px;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    color: #333333;

    .modal-delete {
        position: absolute;
        top: 3px;
        right: 3px;
    }

    .pass-bottom {
        display: flex;
        align-items: center;
        justify-contents: space-between;
        padding-top: 10px;
    }

    .pass-input {
        width: 185px;
        height: 30px;
        border: none;
        background-color: #9E9E9E;
    }

    .pass-button {
        width: 50px;
        height: 30px;
        text-align: center;

        padding-top: 5px;
        margin-left: 6px;

        border-radius: 5px;
        color: #ffffff;
        background-color: #3498DB;
    }

`

export default PasswordField;