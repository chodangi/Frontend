import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { ImKey } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import { PostingUserBox, TemperaturePostingBox } from './PostingBox';
import api from '../../../api/api';

function ModifyCommentBox({prevComment,modifyComment,cancelModify}) {
    const [Input, setInput] = useState({
        userName : "",
        password : "",
        content : ""
    })

    const onInputHandler = (event)=>{
        const {name, value} = event.target
        setInput({
            ...Input,
            [name] : value
        })
    }

    const onCancelClick = (event) =>{
        event.preventDefault()
        cancelModify()
    }

    const onModifyClick = async (event)=>{
        event.preventDefault()
        if(prevComment.password === Input.password){
            const commentDto = {
                "coinSymbol": prevComment.coinSymbol,
                "commentGroup": prevComment.commentGroup,
                "commentId": prevComment.id,
                "content": Input.content,
                "level": prevComment.level,
                "nickname": Input.userName,
                "password": Input.password
            }
            const { data } = await api.post(`/temper/comment`,commentDto)
            modifyComment(data)
            cancelModify()
        }else{
            alert("비밀번호가 틀렸습니다!")
        }
    }

    useEffect(() => {
        setInput({
            userName:prevComment.nickname,
            password:"",
            content:prevComment.content
        })
    }, [])
    
    return (
        <ModifyCommentDiv>
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
                    <div className='modifyList'>
                        <button onClick={onModifyClick}>수정</button>
                        <button onClick={onCancelClick}>취소</button>
                    </div> 
                </div>
                <textarea name="content" value={Input.content} onChange={onInputHandler} placeholder="내용을 입력해주세요" />
            </div>
        </ModifyCommentDiv>
    )
}

const ModifyCommentDiv = styled(TemperaturePostingBox)`
    .PostingInputBox{
        width:100%;
    }

    button{
        width:50%;
        font-size:12px;
        border-right:1px solid rgb(158, 158, 158);
    }

    textarea{
        background-color:rgb(94, 94, 94);
        color:#fff;
        font-size:13px;
        padding:10px;
    }

    .modifyList{
        width:40%;
        display:flex;
    }

    margin-top:0px;
`

export default ModifyCommentBox