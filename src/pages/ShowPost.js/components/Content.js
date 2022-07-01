import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { BsFillShareFill } from "react-icons/bs";
import { MdReport} from "react-icons/md";
import { TierCircle } from "../../../components/TierCircle";
import { Date, Time } from "../../../components/Time";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import PasswordField from "../../../components/PasswordField";
import api from "../../../api/api";

const Content = ({post}) => {

    console.log(post)

    const navigate = useNavigate();

    //로그인여부
    const jwt = localStorage.getItem('user');
    const user = useState(jwt ? true : false)

    //사용자 정보
    let currentUserId;

    const [preference, setPreference] = useState('nothing');

    useEffect(()=>{
        if(user[0] == true) {
            fetch(`https://www.coinfortal.com:8080/profile/my-settings`, {
                method: 'GET',
                headers: {
                    jwt: jwt,
                },
            }).then((response) => {
                response.json().then((data) =>{  
                currentUserId = data.data?.id;
                api.get(`preference/${post.id}/${data.data.id}`)
                .then((response)=> {
                    console.log(response.data.status)
                    setPreference(response.data.status)
                })
            })
        })}
    },[user])

    //수정, 삭제
    const[password, setPassword] = useState();
    const [visible, setVisible] = useState(false);
    const [editOrDelete, setEditOrDelete] = useState('');

    const openPasswordField = (e) => {
        if(visible) setVisible(false);
        else setVisible(true);

        const { id } = e.currentTarget;
        setEditOrDelete(id);
    }

    const editOrDeletePostByGuest = () =>{
        if(password == post.guestPwd){ 
            if(editOrDelete == "modify") {
                setPassword('');
                navigate('/editPost', {
                    state: {
                        post: post
                    },
                });
            } else if (editOrDelete == "delete") {
                fetch(`https://www.coinfortal.com:8080/community/post/non-user/${post.id}/${password}`, {
                    method: 'GET',
                    headers: {
                        jwt: jwt,
                    },})
                    .then((response)=> {
                        console.log(response)
                        setPassword('');
                        navigate(-1);
                    }
                )
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    const goEdit = () => {

        if(post.userId == currentUserId){
            navigate('/editPost', {
                state: {
                  post: post
                },
            });
        } else if(post.userId != currentUserId) {
            alert('수정할 수 없습니다')
            return;
        }

    }


    const deletePost = async () => {

        if(user[0] && (post.userId == currentUserId)){
            console.log(currentUserId)
            alert('삭제할 수 없습니다');
            return;
        }

        try {fetch(`https://www.coinfortal.com:8080/community/post/status/${post.id}`, {
          method: 'POST',
          headers: {
            jwt: jwt,
          },})
          .then((response)=> {
            console.log(response)
            navigate(-1);
          })}
        catch (error){
            console.error(error);
        }

    }

    //게시글 추천비추천

    const likePost = async() => {
        if(user[0] === false){
            alert('로그인 후 이용하실 수 있습니다.');
            return;
        }

        await api.post(`preference/preference-like/${post.id}`)
            .then((response)=> {
                if(response.errorCode)
                    alert(response.errorMessage)
                else {
                    console.log(response.data)
                    if(response.data.likes === true)
                        setPreference('like');
                    else
                        setPreference('nothing');
                }
            })
    }

    const dislikePost = async() => {
        if(user[0] === false){
            alert('로그인 후 이용하실 수 있습니다.');
            return;
        }

        await api.post(`preference/preference-dislike/${post.id}`)
            .then((response)=> {
                if(response.errorCode)
                    alert(response.errorMessage)
                else {
                    console.log(response.data)
                    if(response.data.dislikes === true)
                        setPreference('dislike');
                    else
                        setPreference('nothing');
                }
            })
    }

    //게시글 신고
    const reportPost = () => {
        if(user[0] === false){
            alert('로그인 후 이용하실 수 있습니다.');
            return;
        }

        api.post(`community/post/report?postId=${post.id}`)
            .then((response)=>{
                console.log(response);
                if(response.data === false)
                    alert('이미 신고한 게시물입니다.')
            })
    }


    return (
        <ContentDiv>
            <div className="board-name">
                <div>{post.boardName}</div>
            </div>
            <div className="post-info">
                <div className="top box">
                    <div className="title">{post.content}</div>
                    <div className="date">{Date(post.createdAt)}</div>
                </div>
                <div className="bottom box">
                    <div className="user box">
                        <TierCircle point={post.userPoint} size="big"></TierCircle>
                        <div className="user-nickname"> {post.userNickname}</div>
                    </div>
                    <div className="time">{Time(post.createdAt)}</div>
                </div>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="like">
                <div className={preference === 'like' ? 'up circle active' : 'up circle'} onClick={likePost}>떡상</div>
                <div className={preference === 'dislike' ? 'down circle active' : 'down circle'} onClick={dislikePost}>손절</div>
            </div>
            <div className="line">
                <CopyToClipboard text={window.location.href} onCopy={() => alert("링크가 클립보드에 복사되었습니다!")}>
                    <div className="url"><BsFillShareFill className="icon" size="1.1rem" color="#ffffff"/>URL 복사</div>
                </CopyToClipboard>
                <div className="report"><MdReport className="icon" size="1.3rem" color="red" onClick={reportPost}/>신고</div>
            </div>
            <div className="modify-delete">
                <div className="modify button" id="modify" onClick={jwt ? goEdit : openPasswordField}>수정</div>
                <div className="delete button" id="delete" onClick={jwt ? deletePost : openPasswordField}>삭제</div>
            </div>
            <div className="pass-field">
                {visible && <PasswordField password={password} setPassword={setPassword} setVisible={setVisible} editOrDeleteByGuest={editOrDeletePostByGuest}/>}
            </div>
        </ContentDiv>
    );
}

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    font-size: 12px;

    .post-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        padding: 2px 10px 2px 10px;
        border-top: 2px solid #444444;
        border-bottom: 2px solid #444444;
        color: #9E9E9E;
    }

    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-weight: bold;
        color: ${(props) => props.theme.colors.text};
        width: 75%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;;
    }

    .user.box {
        padding: 0px;
    }

    .post-content {
        width: 100%;
        min-height: 120px;
        padding: 10px 20px 10px 20px;
        word-wrap: break-word; //자동줄바꿈
    }  

    .like {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 45px;
        margin-bottom: 10px;
    }

    .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 45px;
        border-radius: 90%;
        background-color: gray;
    }

    .circle.up {
        margin-right: 30px;
    }

    .active {
        background-color: #3498DB;
    }

    .line {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 20px;
        color: #9E9E9E;
    }

    .url {
        display: flex;
        align-items: center;
    }

    .report {
        display: flex;
        align-items: center;
    }
    
    .url {
        margin-right: 8px;
    }

    .icon {
        margin-right: 2px;
    }

    .modify-delete {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 20px;
        margin-top: 15px;
    }

    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 20px;
        //margin-right: 20px;
        background-color: #404040;
        border-radius: 5px;
    }

    .delete {
        margin: 0px 20px;
    }

    .pass-field {
        position: absolute;
        //top: 50px;
    }
`

export default Content;