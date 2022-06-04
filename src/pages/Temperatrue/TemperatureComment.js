import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams} from "react-router";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../../components/Header";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";
import TemperatureBox from "./components/TemperatureBox";
import Predict from "./components/Predict";
import PostingBox from "./components/PostingBox";
import TemperatureSearch from "./components/TemperatureSearch";
import CommentBox from "./components/CommentBox";
import api from "../../api/api";

const TemperatureComment = (props) => {
    const {temperatureId} = useParams();
    const jwtToken = localStorage.getItem('user')
    const [User, setUser] = useState({})
    const [CommentList, setCommentList] = useState({comments:[]})
    const [Percent, setPercent] = useState(50)
    const [ButtonList, setButtonList] = useState("total")
    const [Search, setSearch] = useState("")

    //인기, 전체 버튼 핸들러
    const ListHandler = (e) => {
        (e.target.classList.contains("total")) ? setButtonList("total") : setButtonList("popularity")
    }

    //댓글 삭제
    const deleteComment = (Delete) => {
        let body = [...CommentList.comments]
        let pod = body.indexOf(Delete)
        body.splice(pod, 1)
        setCommentList({...CommentList, comments : body})
    }

    //댓글 추가 
    //+ 인기나 검색게시판에 있을시에는 전체 게시판으로 이동
    //+ 댓글 추가시 페이지네이션 오류 수정
    const addComment = (e) => {
      setButtonList("total");
      const List = [e, ...CommentList.comments];
      List.splice(List.length-1, 1)
      setCommentList({ ...CommentList, comments: List });
    };

    //매수 매수 했을시 실시간 온도 반영
    const getPercent = (e)=>{
        setPercent(e[temperatureId])
    }

    //검색기능
    const getSearchComment = (data,search)=>{
        setCommentList(data)
        setSearch(search)
        setButtonList("search")
    }

    //Pagination 로직
    const onPageHandler =  ()=>{
        const apiFun =async (url)=>{
            const data = await api.get(url)
            const List = [...CommentList.comments, ...data.comments]
            setCommentList({...data, comments : List})
        }

        switch(ButtonList){
            case "total" : apiFun(`/temper/maincomments/${temperatureId}?size=10&page=${CommentList.currentPage+1}`); break;
            case "popularity" : apiFun(`/temper/comments/hot/${temperatureId}?size=10&page=${CommentList.currentPage+1}`); break;
            case "search" :apiFun(`/temper/comments/keyword/${temperatureId}?size=10&page=${CommentList.currentPage+1}&keyword=${Search}`); break;
        }
    }

    useEffect(() => {
        //초기 온도
        const getTemper = async ()=>{
            const { data } = await api.get('/temper/coin-temper')
            setPercent(data[temperatureId])
        }
        
        //유저 정보 
        const getUser = async () => {
            const { data } = await api.get(`/profile/my-settings`)
            setUser(data)
        }

        if (jwtToken) getUser()
        getTemper()
    }, [])

    //버튼 눌렀을시 각 버튼에 해당하는 댓글 불러오기
    useEffect(() => {
        const getComment = async (url) => {
            const data = await api.get(url)
            setCommentList(data)
        }

        switch(ButtonList){
            case "total": getComment(`/temper/maincomments/${temperatureId}?size=10&page=0`); break;
            case "popularity" : getComment(`/temper/comments/hot/${temperatureId}?size=10&page=0`); break;
            case "search" : ; break;
        }
    }, [ButtonList])

    return (
        <TemperatureCommentDiv>
            <Header theme={props.theme} darkModeHandler={props.darkModeHandler} />
            <MainNav />
            <div className="content" >
                <TemperatureBox noBackground={true} type={temperatureId} temper={Percent} />
                <Predict type={temperatureId} getPercent={getPercent} />
                <PostingBox type={temperatureId} addComment={addComment} refly={{
                    reflyConfirm: false,
                    commentGroup: -1
                }} />
                <div className="list">
                    <ul className="button_list">
                        <TemperatureList className="popularity" onClick={ListHandler} changebtn={ButtonList === "popularity"}>인기</TemperatureList>
                        <TemperatureList className="total" onClick={ListHandler} changebtn={ButtonList === "total"}>전체</TemperatureList>
                    </ul>
                    <TemperatureSearch type={temperatureId} getSearchComment={getSearchComment} />
                </div>
                {CommentList.comments.map((e) => (
                    <CommentBox comment={e} key={e.id} refly={false} user={User} deleteComment={deleteComment} type={temperatureId} />
                ))}
            </div>
            {CommentList.currentPage !== CommentList.totalPages - 1 ? <MoreButton onClick={onPageHandler}><MdOutlineKeyboardArrowDown className="icon" /></MoreButton> : null}
            <Footer />
        </TemperatureCommentDiv>
    );
}

const TemperatureCommentDiv = styled.div`
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

    .button_list{
        width:50%;
        height:30px;
        display:flex;
        list-style:none;
        margin:0;
        padding:0;
    }

    .list{
        display:flex;
        width:100%;
        justify-content:space-between;
        margin-top:40px;
        border-bottom:0.5px solid rgb(64, 64, 64);
    }
`

const TemperatureList = styled.li`
    width:50%;
    height:100%;
    background-color:${({ changebtn }) => changebtn ? '#3498DB' : 'rgb(42, 46, 53)'};
    line-height:30px;
    text-align : center;
    font-size:12px;
`

const MoreButton = styled.div`
    width:100%;
    hegiht:20px;
    background-color:#212121;
    display:flex;
    justify-content:center;
    cursor:pointer;

`

export default TemperatureComment;