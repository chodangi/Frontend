import React, {useState, useEffect, forwardRef} from "react";
import styled from "styled-components";

import TextField from "../TextField";
import api from "../../api/api";

const CommentEditor = forwardRef((props, ref) => {

  console.log(props.replyComment);

  const [comment, setComment] = useState({
    postId: 0,
    nickname: '',
    password: '000000',
    content: '',
    commentGroup: -1,
    level: 0,
  });

  //답댓글
  useEffect(()=>{
    props.reply && setComment({
      ...comment,
      content: "@"+props.replyComment.writer+"  ",
      commentGroup: props.replyComment.group
    });

    console.log(comment);
  },[props.replyComment])

    //로그인여부
    const jwt = localStorage.getItem('user');
    const user = useState(jwt ? true : false);

    //사용자정보

    useEffect(()=>{
        if(user == true) {
            fetch(`http://13.209.180.179:8080/profile/my-settings`, {
                method: 'GET',
                headers: {
                    jwt: jwt,
                },
            }).then((response) => {
                response.json().then((data) =>{  
                comment.userId = data.data?.id;
                comment.userPoint = data.data?.point;
                console.log(comment)
            })
        })} else return;
    },[user])

    
    
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
          console.log("빈칸을 채우세요");
          return;
        }
        
          await fetch('http://13.209.180.179:8080/comment', {
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
          })  
        }
  

    return (
        <CommentEditorDiv>
            <div className="input-box" ref={ref}>
                <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="nickname" onChange={onChange} value={comment.nickname}></input>
                {user[0] ? <></> : <input type="password" className="input password" placeholder="비밀번호" id="password" onChange={onChange} value={comment.password}></input>}
            </div>
            <div></div>
            <TextField className="editor" type='comment' onChange={onChange} content={props.reply && comment.content} reply={props.reply}/>
            <div className="submit">
                <div className="submit-btn" onClick={createComment}>등록</div>
            </div>
        </CommentEditorDiv>
    );
 })

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