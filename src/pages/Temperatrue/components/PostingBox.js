import React, { useState } from 'react'
import styled from 'styled-components'
import api from '../../../api/api';

function PostingBox({type, refly, addComment}) {
    const [Input, setInput] = useState("")

    const jwtToken = localStorage.getItem('user')

    const onInputHandler = (event)=>{
        setInput(event.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const commentDto = {
            "commentGroup": refly.commentGroup,
            "content": Input,
            "level": refly.reflyConfirm ? 1 : 0,
        }

        if(jwtToken){
            const postComment = async () => {
                const { data } = await api.post(`/temper/comment/${type}`,commentDto)
                addComment(data)
                setInput("")
            }
            
            if(Input.length === 0){
                alert("내용을 입력해주세요")
            }else{
                postComment()
            }
        }else{
            alert("로그인을 해주세요!")
        }

    }

    return (
        <TemperaturePostingBox reflyConfirm={refly.reflyConfirm}>
            <div className='PostingInputBox'>
                <textarea name="content" value={Input} onChange={onInputHandler} maxLength="195" placeholder="내용을 입력해주세요" />
            </div>
            <button onClick={onSubmitHandler}>등록</button>
        </TemperaturePostingBox>
    )
}

export const TemperaturePostingBox = styled.form`
    width:100%;
    max-width: 600px;
    height:90px;
    margin-top:25px;
    background-color:white;
    display:flex;
    justify-content:space-between;
    ${(props)=>props.reflyConfirm ? 'position:absolute; bottom:0px; position:fixed;' : null }

    input{
        width:100%;
        border:0px;
        outline:none;
        padding-left:10px;
    }

    .PostingInputBox{
        width:77%;
    }

    .PostingUserBox{
        display:flex;
    }

    button{
        border:0px;
        background-color:rgb(190, 190, 190);
        width:33%;
        font-size:16px;
        font-weight:bold;
        cursor:pointer
    }

    textarea{
        width:100%;
        padding:10px;
        height:100%;
        border:0px;
        outline:none;
    }

`

export const PostingUserBox = styled.div`
    width:50%;
    height:25px;
    border-bottom:1px solid rgb(190, 190, 190);
    display:flex;

    label{
        display:block;
        width:25px;
        height:25px;
        background-color:rgb(237, 237, 237);
        border-bottom:1px solid rgb(190, 190, 190);
        padding:4px;
    }

    label svg{
        color: rgb(166, 166, 166);
        display:flex;
        justify-content: center;
    }

    input{
        width:100%;
    }
`

export default PostingBox