import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { TemperaturePostingBox } from './PostingBox';
import api from '../../../api/api';

function ModifyCommentBox({prevComment,modifyComment,cancelModify}) {
    const [Input, setInput] = useState("")

    const onInputHandler = (event)=>{
        setInput(event.target.value)
    }

    const onCancelClick = (event) =>{
        event.preventDefault()
        cancelModify()
    }

    const onModifyClick = async (event)=>{
        event.preventDefault()
            const commentDto = {
                "coinSymbol": prevComment.coinSymbol,
                "commentGroup": prevComment.commentGroup,
                "commentId": prevComment.id,
                "content": Input,
                "level": prevComment.level,
                "nickname": prevComment.nickname
            }
            const { data } = await api.post(`/temper/comment`,commentDto)
            modifyComment(data)
            cancelModify()
        
    }

    useEffect(() => {
        setInput(prevComment.content)
    }, [])
    
    return (
        <ModifyCommentDiv>
            <div className='PostingInputBox'>
                <textarea name="content" value={Input} onChange={onInputHandler} placeholder="내용을 입력해주세요" />
                <div className='modifyList'>
                    <button onClick={onModifyClick}>수정완료</button>
                    <button onClick={onCancelClick}>취소</button>
                </div>
            </div>
        </ModifyCommentDiv>
    )
}

const ModifyCommentDiv = styled(TemperaturePostingBox)`
    height:80px;
    
    .PostingInputBox{
        width:100%;
        display:flex;
    }

    button{
        width:100%;
        height:50%;
        font-size:12px;
        border-bottom:1px solid rgb(158, 158, 158);
    }

    textarea{
        width:77%;
        background-color:rgb(94, 94, 94);
        color:#fff;
        font-size:13px;
        padding:10px;
    }

    .modifyList{
        width:33%;
        display:flex;
        flex-direction: column;
    }

    margin-top:0px;
`

export default ModifyCommentBox