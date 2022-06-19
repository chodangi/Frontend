import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

const TextField = ({type, onChange, content, reply, isEditing, text, setText}) => {
    
    useEffect(()=> {
        (isEditing || reply) && setText(content);
    },[content])

    const changeText = (e) =>{
        setText(e.currentTarget.value);
        onChange(e);
    }

    const textRef = useRef();
    const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
    }, []);

    return (

        <TextAreaDiv id="content" type="text" ref={textRef}
        placeholder={type === 'comment' ? '댓글을 입력해주세요.' : '내용'} 
        style={{ minHeight: type === 'comment' ? '90px' : '150px'}}
         onChange={changeText} onInput={handleResizeHeight} suppressContentEditableWarning={true} value={text}>
        </TextAreaDiv>

    );
}

const TextAreaDiv = styled.textarea`

    width: 100%;
    paddingTop: 0px;
    padding: 10px 20px 10px 20px;
    //border-bottom: 2px solid #444444;
    background-color: transparent;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    color: ${(props) => props.theme.colors.text}; 
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