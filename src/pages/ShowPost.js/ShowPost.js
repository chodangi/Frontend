import React, {useState, useEffect, useRef, useCallback} from "react";
import styled from "styled-components";
import {useParams, useNavigate } from 'react-router-dom';

import Header from "../../components/Header";
import Navigator from "../../components/BoardNav";
import Footer from "../../components/Footer";
import Content from "./components/Content";
import Comment from "../../components/Comment/Comment";
import CommentEditor from "../../components/Comment/CommentEditor";

const ShowPost = (props) => {

  //로그인여부
  const jwt = localStorage.getItem('user');
  
  const user = useState(jwt ? true : false)

  // 댓글 리렌더링
  const [state, updateState] = useState();
  
  const forceUpdate = useCallback(()=> updateState({}), []);


    //게시글 조회, 작성자 포인트 조회
    const postId = useParams().postId

    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect( async()=>{
      try { 
        await fetch(`https://www.coinfortal.com:8080/community/post/${postId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => {
          response.json().then((data) =>{ 
            console.log(data.data);
            setPost(data.data);
            console.log(post.comments)
            setIsLoading(false);
          })
        }) 
      }
      catch(error) {
        console.log(error)
      }

    },[state])

  //사용자 접근
  const [restriction, setRestriction] = useState(true);

  const navigate = useNavigate();

  const goHome = () => {
    alert('접근할 수 없는 게시판입니다.');
    navigate('/');
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
     if(isLoading === false){ if(user[0] == true) {
        fetch(`https://www.coinfortal.com:8080/profile/my-settings`, {
            method: 'GET',
            headers: {
                jwt: jwt,
            },
        }).then((response) => {
            response.json().then((data) =>{  
            console.log(data.data?.point);
            if(post.boardName == '부자게시판') {
              if(data.data?.point >= 1000)
                setRestriction(false);
              else goHome();
            } else if (post.boardName == '그지게시판'){
              if(data.data?.point <= -1000)
                setRestriction(false);
              else goHome();
            } else if (post.boardName == '자유게시판'){
              setRestriction(false);
            }
        })
    })} else if(user[0] == false){
      if(post.boardName == "자유게시판") {
        console.log(';')
        setRestriction(false);          
      } else {
        goHome();
      };}
    }

    console.log(restriction);
  },[isLoading])

  //답댓글 달기
  const [reply, setReply] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const editorRef = useRef(null);

  const moveToEditor = (e) =>{
    console.log(replyComment);
    setReply(true);
    editorRef.current?.scrollIntoView({ behavior: 'smooth' });

  };
  

    return (!isLoading && !restriction) && (
        <ShowingDiv id="ShowingDiv">
            <div className="community__top">
                <Header theme={props.theme} darkModeHandler={props.darkModeHandler}/>
                <Navigator/>
            </div>
            <Content post={post}/>
            <div className="commentNum">댓글  ({post.comments?.length})</div>
            {post.comments?.sort((a, b) => { return a.commentGroup - b.commentGroup;})
              .map((c)=> {
              if(c.status == 'A'){
                  return (
                    <Comment commentDto={c} key={c.id} forceUpdate={forceUpdate} moveToEditor={moveToEditor} setReplyComment={setReplyComment} isDeleted={false}/>
                  )
              }
              else {
                return(
                  <Comment commentDto={c} key={c.id} forceUpdate={forceUpdate} moveToEditor={moveToEditor} setReplyComment={setReplyComment} isDeleted={true}/>
                ) 
              }      
            })}
            <CommentEditor postId={post.id} forceUpdate={forceUpdate} ref={editorRef} reply={reply} setReply={setReply} replyComment={replyComment}/>
            <Footer/>
        </ShowingDiv>
    );
}



const ShowingDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  font-size: 12px;

  .community__top{
    width: 100%;
    height: auto;
  }

  .board-name {
    display: flex;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .commentNum {
    display: flex;
    align-items: center;
    width: 100%;
    height: 25px;
    margin-top: 10px;
    padding-left: 10px;
    background-color: #27272A;

  }

  .partition {
      width: 100%;
      height: 20px;
      background-color: #27272A;
      box-shadow: inset 1px 2px 5px 1px gray;

  }
`;


export default ShowPost;