import React, { useState } from 'react'
import { ImKey } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components'
import api from '../../../api/api';

function PostingBox({type, refly, addComment}) {
    const [Input, setInput] = useState({
        userName : "",
        password : "",
        content : ""
    })

    const jwtToken = localStorage.getItem('user')

    const onInputHandler = (event)=>{
        const {name, value} = event.target
        setInput({
            ...Input,
            [name] : value
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const commentDto = {
            "commentGroup": refly.commentGroup,
            "content": Input.content,
            "level": refly.reflyConfirm ? 1 : 0,
            "nickname": Input.userName,
            "password": Input.password
        }

        if(jwtToken){
            const postComment = async () => {
                const { data } = await api.post(`/temper/comment/${type}`,commentDto)
                addComment(data)
                setInput({
                    userName : "",
                    password : "",
                    content : ""
                })
            }
            if(Input.userName.length===0){
                alert("닉네임을 입력해주세요")
            }else if(Input.password.length < 4){
                alert("패스워드를 4자 이상 입력해주세요")
            }else if(Input.content.length === 0){
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
                <div className='PostingUserBox'>
                    <PostingUserBox>
                        <label><FaUser /></label>
                        <input name="userName" type="text" value={Input.userName} onChange={onInputHandler} placeholder="UserName" />
                    </PostingUserBox>
                    <PostingUserBox>
                        <label><ImKey /></label>
                        <input name="password" type="password" value={Input.password} onChange={onInputHandler} placeholder="pass" />
                    </PostingUserBox>
                </div>
                <textarea name="content" value={Input.content} onChange={onInputHandler} placeholder="내용을 입력해주세요" />
            </div>
            <button onClick={onSubmitHandler}>등록</button>
        </TemperaturePostingBox>
    )
}

export const TemperaturePostingBox = styled.form`
    width:100%;
    max-width: 600px;
    height:100px;
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
        padding:5px;
        height:75px;
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