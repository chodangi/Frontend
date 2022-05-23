import React, {useState} from "react";
import styled from "styled-components";
import axios, { Axios } from "axios";

import TextField from "../TextField";

const CommentEditor = ({postId}) => {

    const [comment, setComment] = useState({
        postId: postId,
        nickname: '',
        password: '',
        content: '',
        commentGroup: 0,
        level: 0,
      })
    
      const onChange = (e) => {
        const { id } = e.currentTarget;
    
        if( id == "content") {
          setComment({
            ...comment,
            [id]: e.currentTarget.innerHTML
          });
          console.log(comment);
        } else if( id == "nickname"){
          setComment({
            ...comment,
            [id]: e.currentTarget.value,
            nickname: e.currentTarget.value
          });
          console.log(comment);
        } else if( id == "password" ){
          setComment({
            ...comment,
            [id]: e.currentTarget.value,
          });
          console.log(comment);
        }
        
      }
      
      const createComment = async () => {
    
        if(comment.nickname == '' || comment.password == '') {
          console.log("빈칸을 채우세요");
          return;
        }
    
        await axios.post("/api/comment", 
                { params: comment },
                {
                  headers: { Authrozation: 'testToken' }
                }
              )
              .then((response) => {
                  console.log(response.data);
                  console.log("댓글 작성 완료");
                })
              .catch((error) => {
                  console.error("실패했습니다");
              })
        }
    
    

    return (
        <CommentEditorDiv>
            <div className="input-box">
                <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="nickname" onChange={onChange}></input>
                <input type="password" className="input password" placeholder="비밀번호" id="password" onChange={onChange}></input>
            </div>
            <div></div>
            <TextField className="editor" type='comment' onChange={onChange}/>
            <div className="submit">
                <div className="submit-btn">등록</div>
            </div>
        </CommentEditorDiv>
    );
 }

const CommentEditorDiv = styled.div`

    width: 100%;

    .input-box {
        width: 100%;
        border-bottom: 2px solid #444444;
    }

    .input {
        width
        height: 30px;
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme.colors.text}; 
        font-size: 12px;
        padding-left: 20px;
    }

    .input.nickname{
        width: 135px;
        border-right: 2px solid #444444;
    }

    .input.password{
        width: 160px; //닉네임이랑 비밀번호 너비 조정 필요 나중에 비율로 주기
    }

    .editor {
        min-height: 90px;
    }

    .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 5px 20px 0px 0px;
    }

    .submit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 20px;
        background-color: #3498DB;
        border-radius: 5px;
    }
`

export default CommentEditor;