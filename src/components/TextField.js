import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TextField = ({type, onChange, content, reply, isEditing}) => {

    const [text, setText] = useState();
    console.log((type === "comment") ? (reply == true ? content : '') : (isEditing == true ? content: ''))
    
    useEffect(()=> {
        (isEditing || reply) && setText(content);
    },[content])

    const changeText = (e) =>{
        setText(e.currentTarget.value);
        onChange(e);
    }

    return (

        <InputDiv id="content" type="text"
        placeholder={type === 'comment' ? '댓글을 입력해주세요.' : '내용'} 
        style={{ minHeight: type === 'comment' ? '90px' : '150px'}}
         onChange={changeText} suppressContentEditableWarning={true} value={text}>
        </InputDiv>

    );
}

const StyledDiv = styled.div`

    width: 100%;
    padding: 10px 20px 10px 20px;
    //border-bottom: 2px solid #444444;
    font-size: 12px;

    *{
        padding: 0;
        margin: 0;
    }
    :empty::before {
        content: attr(placeholder);
        color: gray;
    }
`

const InputDiv = styled.input`

    width: 100%;
    padding: 10px 20px 10px 20px;
    //border-bottom: 2px solid #444444;
    font-size: 12px;

    *{
        padding: 0;
        margin: 0;
    }
    :empty::before {
        content: attr(placeholder);
        color: gray;
    }
`
export default TextField;