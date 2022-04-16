import React, { useState } from "react";
import styled from "styled-components";

const TextField = ({type, onChange}) => {

    return (
        <StyledDiv id="content" contentEditable={true}
            placeholder={type === 'comment' ? '댓글을 입력해주세요.' : '내용'} 
            style={{ minHeight: type === 'comment' ? '90px' : '150px'}}
             onInput={onChange} onChange={onChange}>

        </StyledDiv>
        
    );
}

const StyledDiv = styled.div`

    width: 100%;
    padding: 10px 20px 10px 20px;
    border-bottom: 2px solid #444444;
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