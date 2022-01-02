import React, { useState } from "react";
import styled from "styled-components";

const Editor = () => {

    const[content, setContent] = useState();

    const onContentHandler = (e) => {
        setContent(e.target.innerHtml);
    }

    return (
        <StyledDiv id="contentDiv" contentEditable="true" placeholder="내용" onInput={onContentHandler}></StyledDiv>
    );
}

const StyledDiv = styled.div`

    width: 100%;
    min-height: 150px;
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
export default Editor;