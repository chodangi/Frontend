import React, {useState, useEffect, forwardRef} from "react";
import styled from "styled-components";

import TextField from "../TextField";
import { AiOutlineClose } from "react-icons/ai";
import { ImKey } from 'react-icons/im';
import { FaUser } from 'react-icons/fa';
import api from "../../api/api";

const CommentEditor = forwardRef((props, ref) => {

  console.log(props.replyComment);
  

    //로그인여부
    const jwt = localStorage.getItem('user');
    const user = useState(jwt ? true : false);

    const [text, setText] = useState();

    const [comment, setComment] = useState({
      postId: 0,
      nickname: '',
      password: '',
      content: '',
      commentGroup: -1,
      level: 0,
    });

    //사용자정보

    useEffect(()=>{
        if(user[0] == true) {
            fetch(`http://www.coinfortal.com:8080/profile/my-settings`, {
                method: 'GET',
                headers: {
                    jwt: jwt,
                },
            }).then((response) => {
                response.json().then((data) =>{
                setComment({
                  ...comment,
                  userId : data.data?.id,
                  userPoint : data.data?.point,
                  nickname : data.data?.userNickname
                })
                console.log(comment)
            })
        })} else return;
    },[])

    
    
      const onChange = (e) => {
        const { id } = e.currentTarget;
    
        if( id == "content") {
          setComment({
            ...comment,
            [id]: e.currentTarget.value
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

      const resetComment = async() => {
        await setComment({
          ...comment,
          postId: 0,
          nickname: '',
          password: '',
          content: '',
          commentGroup: -1,
          level: 0,
        });
        setText('');
        console.log(comment);
      }
      
      const createComment = async () => {
    
        comment.postId = props.postId
        console.log(comment);

        if(props.reply === true){
          comment.commentGroup = props.replyComment.group;
          comment.level = 1;
        }

        if(comment.nickname == '') {
          alert("닉네임을 입력하세요");
          return;
        }

        if(!user[0] && comment.password == "") {
          alert("비밀번호를 입력하세요");
          return;
        }
        
          if(user[0]){
            await fetch('http://www.coinfortal.com:8080/comment', {
              headers: { 
                'Content-type': 'application/json',
                jwt: jwt,
              },
              method:'POST',
              body: JSON.stringify(comment)
            }).then(()=>{
              props.forceUpdate();
              resetComment(); 
              props.setReply(false);          
            })} else {
              await fetch('http://www.coinfortal.com:8080/comment', {
                headers: { 
                  'Content-type': 'application/json',
                },
                method:'POST',
                body: JSON.stringify(comment)
              }).then(()=>{
                props.forceUpdate();
                resetComment(); 
                props.setReply(false);          
              })  
          }
      }

        //답댓글

        const cancleReply = () =>{
          props.setReply(false);
          setComment({
            ...comment,
            content: '',
          });
        }
  

    return (
        <CommentEditorDiv>
            <div className="input-box" ref={ref}>
              <div className="input">
                <FaUser className="label" size="15"/>
                <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="nickname" onChange={onChange} value={comment.nickname}></input>
              </div>
              { user[0] ? <></> :
                <div className="input">
                <ImKey className="label" size="15"/>
                <input type="password" className="input password" placeholder="비밀번호" id="password" onChange={onChange} value={comment.password}></input>
                </div>
              }
            </div>
            {
            props.reply ?
            <div className="reply">
              <div>ㄴ @{props.replyComment.writer}</div>
              <AiOutlineClose className="delete" size="1rem" onClick={cancleReply}/>
            </div>
            :
            <></>
            }
            <TextField className="editor" type='comment' onChange={onChange} content={props.reply && comment.content} reply={props.reply} text={text} setText={setText}/>
            <div className="submit">
                <div className="submit-btn" onClick={createComment}>등록</div>
            </div>
        </CommentEditorDiv>
    );
 })

const CommentEditorDiv = styled.div`

    width: 100%;

    .reply {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px 15px;
    }

    .input-box {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 30px;
      border-bottom: 2px solid #444444;
      padding-left: 4px;
    }

    .input {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: transparent;
      border: none;
      color: ${(props) => props.theme.colors.text}; 
      font-size: 12px;
      padding-left: 11px;
    }

    .nickname{
        width: 135px;
        border-right: 2px solid #444444;
    }

    .password{
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