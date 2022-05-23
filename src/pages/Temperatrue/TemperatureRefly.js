import React,{useState} from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import CommentBox from "./components/CommentBox";
import PostingBox from "./components/PostingBox";

function TemperatureRefly(props) {
    const category = useLocation();
    const User = category.state.users
    const Comment = category.state.comments
    const Refly = category.state.reflyComment
    const [ReflyList, setReflyList] = useState(Refly.reverse())

    const addComment = (e)=>{
        setReflyList([e, ...ReflyList])
    }

    const deleteComment = (Delete) => {
        let body = [...ReflyList]
        let pod = body.indexOf(Delete)
        body.splice(pod, 1)
        setReflyList(body)
    }

  return (
      <TemperatureReflyDiv>
          <Header theme={props.theme} darkModeHandler={props.darkModeHandler} />
          <MainNav />
          <div className="content">
              <CommentBox comment={Comment} refly={{ Boolean: true, Comment: Refly }} user={User} />
              <PostingBox refly={{
                  reflyConfirm: true,
                  commentGroup: Comment.commentGroup
              }} type={Comment.coinSymbol} addComment={addComment} />
              {ReflyList.map((e) => (
                  <CommentBox comment={e} refly={{ Boolean: true, Comment: [] }} user={User} deleteComment={deleteComment} key={e.id}/>
              ))}
          </div>
          <Footer />
      </TemperatureReflyDiv>
  )
}

const TemperatureReflyDiv = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;

    width: 100vw;
    max-width: 600px;

    .content {
        display:flex;
        flex-direction: column;
        align-items:center;
        width: 100%;
        min-height:${window.innerHeight - 80}px
    }
`

export default TemperatureRefly