import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import api from '../../../api/api';
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import ModifyCommentBox from './ModifyCommentBox';

function CommentBox({ comment, refly, user, deleteComment, type }) {
  const navigate = useNavigate();
  const date = comment.createdAt.substring(0, 10).replace(/[-]/g, ".")
  const time = comment.createdAt.substring(11, 16)
  const jwtToken = localStorage.getItem('user')

  const [Comment, setComment] = useState({})
  const [Reflycomments, setReflycomments] = useState([])
  const [Refly, setRefly] = useState(false)
  const [Modify, setModify] = useState(false)
  const [Favorites, setFavorites] = useState(false)

  useEffect(() => {
    //대댓글인지 원댓글인지 구분하는 조건문
    (comment.level === 1) ? setRefly(true) : setRefly(false)

    //원댓글인 경우 해당하는 대댓글 호출
    if(!refly && comment.level !== 1){
      const replyList = async () => {
        const data = await api.get(`/temper/replycomments/${type}?group=${comment.commentGroup}`)
        setReflycomments(data.replies.slice(0, -1))
      }
      replyList()
    }

    //수정을 위해 댓글 내용을 state에 1차적으로 저장
    setComment(comment)
  }, [])

  //댓글 수정 로직
  const onModifyHandler = () => {
    setModify(true)
  }

  //댓글 수정
  const modifyComment = (data)=>{
    setComment(data)
  }

  //댓글 수정 취소
  const cancelModify = ()=>{
    setModify(false)
  }

  //댓글 달기 버튼 로직
  const onReflyCommentHandler = ()=>{
    if(Reflycomments.length > 0){
      return <MoreButton onClick={onReflyHandler}>댓글 {Reflycomments.length}개</MoreButton>
    }else{
      return <MoreButton onClick={onReflyHandler}>댓글달기</MoreButton>
    }
  }

  //대댓글 페이지로 이동
  const onReflyHandler = () => {
    navigate("/temperatureRefly", { state: { comments: comment, users: user, reflyComment : Reflycomments } })
  }

  //댓글 신고
  const onReportHandler = async() => {
    if (window.confirm("정말 신고하겠습니까?")) {
      alert("신고되었습니다");
      const { data } = await api.post(`/temper/comment-report?commentId=${Comment.id}`)
    }
  }

  //댓글 삭제
  const onDeleteHandler = () => {
    const commentDto = {
      "coinSymbol": Comment.coinSymbol,
      "commentGroup": Comment.commentGroup,
      "commentId": Comment.id,
      "content": Comment.content,
      "level": Comment.level,
      "nickname": Comment.nickname,
      "password": Comment.password
    }

    if (window.confirm("정말 삭제하겠습니까?")) {
      alert("삭제되었습니다");
      axios.delete(`/api/temper/comment`, { data: commentDto, headers: { 'jwt': `${jwtToken}` } })
      deleteComment(Comment)
    }
    
  }

  //좋아요 기능(한번만 가능)
  const onFavoriteHandler = async () => {
    setFavorites(true);
    const data = await api.post(`/temper/comment-like?commentId=${Comment.id}`);
    setComment({ ...Comment, upCnt: data.data });
  };

  //날짜 변경
  const onDateHandler = ()=>{
    const today = new Date();

    const getDay = (item)=>{
      const day = String(item.getDate()).padStart(2, "0");
      const month = String(item.getMonth()+1).padStart(2, "0");
      return (`${month}-${day}`)
    }

    if(getDay(today) === comment.createdAt.substring(5,10)){
      return <span className='date'>{time}</span>
    }else{
      return <span className='date'>{date}</span>
    }
  }

  return (
    (Modify) ? <ModifyCommentBox prevComment={Comment} cancelModify={cancelModify} modifyComment={modifyComment}/> :
      <CommentDiv refly={Refly}>
        <h3>{Comment.nickname}</h3>
        <p>{Comment.content}</p>
        <div className='modifyBox'>
          {user.id === comment.userId ?
            <ModifyDiv>
              <span className='modify' onClick={onModifyHandler}>수정</span>
              <span className='delete' onClick={onDeleteHandler}>삭제</span>
            </ModifyDiv>
            :
            <span className="report" onClick={onReportHandler}>신고</span>}
            {onDateHandler()}
        </div>
        <Favorite onClick={onFavoriteHandler}>
          {Favorites ? <AiFillHeart className="heart" /> :<AiOutlineHeart className="heart" />}
          <span>{Comment.upCnt}</span>
        </Favorite>
        {refly || comment.level === 1 ? null : onReflyCommentHandler()}
      </CommentDiv>
  )
}

const CommentDiv = styled.div`
    width:100%;
    border-bottom:0.5px solid rgb(64, 64, 64);
    font-size:13px;
    padding:10px;
    position:relative;
    padding-bottom:10px;
    ${props => props.refly ? 'background-color:#212121;' :null}
    
    h3{
      margin:0px 0px 10px 0px;
      line-height:1em;
    }
    p{
      margin:0px;
      margin-bottom:25px;
    }
    .modifyBox{
      position:absolute;
      display:flex;
      font-size:12px;
      top:10px;
      right:10px;
    }
    .date{
      margin-left:8px;
    }
`

const ModifyDiv = styled.div`

  span{
    margin-left:5px;
  }
`

const Favorite = styled.div`
    display:flex;
    font-size:12px;
    position:absolute;
    bottom:10px;
    right:10px;
    cursor:pointer;
    span{
      margin:0px 0px 0px 3px;
      color:rgb(158, 158, 158);
    }
    .heart{
      width:12px; 
      height:17px; 
      color:rgb(251, 114, 102)
    }
`

const MoreButton = styled.div`
    position:absolute;
    font-size:13px;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
    color:rgb(158, 158, 158);
    cursor:pointer;
`

export default CommentBox