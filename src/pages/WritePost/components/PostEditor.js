import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import TextField from "../../../components/TextField";
import CategoryPicker from "./CategoryPicker";

import { FiImage } from "react-icons/fi";


const PostEditor = ({category, isEditing, postObj}) => {

  const navigate = useNavigate();

  //로그인여부
  const jwt = localStorage.getItem('user');
  const user = useState(jwt ? true : false)

  //글쓰기
  const [text, setText] = useState();

  const editedPost= isEditing ? {
    "attachedFiles": postObj.attachedFiles,
    "boardName": postObj.boardName,
    "content": postObj.content,
    "guestName": postObj.guestName,
    "guestPwd": postObj.guestPwd,
    "nickname": postObj.userNickname,
    "postId": postObj.id,
    "userId": postObj.userId
  } : {}
  
  const [post, setPost] = useState( !isEditing ?
    {
    nickname: '',
    content: '',
    boardName: category,
    guestName: '',
    guestPwd: '',
    } 
    :
    {
      attachedFiles: postObj.attachedFiles,
      boardName: postObj.boardName,
      content: postObj.content,
      guestName: postObj.guestName,
      guestPwd: postObj.guestPwd,
      nickname: postObj.userNickname,
      postId: postObj.id,
      userId: postObj.userId
    }
  )

  //이름불러오기
  useEffect(()=>{
    if(user[0] === true){
      fetch(`http://www.coinfortal.com:8080/profile/my-settings`, {
            method: 'GET',
            headers: {
                jwt: jwt,
            },
        }).then((response) => {
            response.json().then((data) =>{  
            console.log(data.data);
            setPost({
              ...post,
              nickname: data.data?.userNickname
            })
        })
      })}
  },[])


  const onChange = (e) => {
    const { id } = e.currentTarget;

    if( id == "content") {
        setPost({
          ...post,
          [id]: e.currentTarget.value
        });
    } else if( id == "nickname"){
        if(user[0] == true) {
          setPost({
            ...post,
            nickname: e.currentTarget.value
          });
        } else {
          setPost({
            ...post,
            guestName: e.currentTarget.value
          });
        }
      console.log(post);
    } else if( id == "guestPwd" ){
      setPost({
        ...post,
        [id]: e.currentTarget.value,
      });
    } else if( id.substring(id.length-5, id.length) == "board"){
    
      let selectedCategory = "";

      switch (id) {      
        case "free-board" :
          selectedCategory = '자유게시판';
          break;

        case "rich-board" :
          selectedCategory = '부자게시판';
          break;
        
        case "poor-board" :
          selectedCategory = '그지게시판';
          break;
      }

      setPost({
          ...post,
          boardName: selectedCategory,
        });

      console.log(post);
    }
    
  }

  //이미지
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState([]);	//파일	

  const photoInput = useRef();

  const handleClick = () => {
    photoInput.current.click();
  };

  const onChangeImage = () => {
    console.log(photoInput.current.files)

    const reader = new FileReader();
    reader.readAsDataURL(photoInput.current.files[0]);

    var img = new Image();
    img = photoInput.current.files[0];
    console.log(photoInput.current.files)
    

    if(isEditing){
      editedPost.attachedFiles = photoInput.current.files;
    } else {
      setPost({
        ...post,
        attachedFiles: photoInput.current.files
      });
    }

    reader.onloadend = () => {
      const base64 = reader.result;
      console.log(base64);
      if (base64) {
        let base64Sub = base64.toString()  
        setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
      console.log(imgBase64)
      }
    };

  }
  
  // 게시글 작성

  const makeQuery = obj => Object.keys(obj).reduce((res,key)=>{
    return res + `&${key}=${obj[key]}`
  },'').substring(1)

  const createPost = async () => {

    if(post.nickname == "") {
      alert("빈칸을 채우세요");
      return;
    }

    await fetch(`http://www.coinfortal.com:8080/profile/my-settings`, {
      method: 'GET',
      headers: {
        jwt: jwt,
      },
    }).then((response) => {
      if(user[0] == true) {
        response.json().then((data) =>{  
          post.userId = data.data.id;
          post.userPoint = data.data.point;
        })
      }
    })

    await fetch(`http://www.coinfortal.com:8080/attach/post-image?${makeQuery(post)}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        jwt: jwt,
      },
    })
      .then((response) => {
        console.log(post)
        navigate(-1);
      })
  }

  const createPostByGuest = async () => {

    if(post.guestPwd == "" || post.guestName == "") {
      alert("빈칸을 채우세요");
      return;
    }
    
    await fetch(`http://www.coinfortal.com:8080/post/non-user?${makeQuery(post)}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        jwt: jwt,
      },
    })
      .then((response) => {
        console.log('성공')
        navigate(-1);
      })
  }

  // 게시글 수정

  const updatePost = async () => {

    console.log(postObj);

    if(user[0]){
      await fetch(`http://www.coinfortal.com:8080/community/post`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          jwt: jwt,
        },
        body:JSON.stringify(post),
      })
        .then(() => {
          navigate(-1);
        }) 
        .catch((error) => {
          console.log(error.response.data);
      })
    } else {
      await fetch(`http://www.coinfortal.com:8080/community/post/non-user/${post.postId}/${post.guestPwd}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          jwt: jwt,
        },
        body:JSON.stringify(post),
      })
        .then(() => {
          navigate(-1);
        }) 
        .catch((error) => {
          console.log(error.response.data);
      })
    }
   
}

  return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      <PostEditorDiv>
        <div className="title-box">
          <div className="title">글쓰기</div>
          <CategoryPicker className="categoryPicker" category={category} onChange={onChange}></CategoryPicker>
        </div>
        <div className="userInfo">
          <input type="text" className="input nickname" placeholder="닉네임" spellCheck="false" id="nickname" value={user[0] ? post.nickname : post.guestName} onChange={onChange} disabled={isEditing ? true : false}></input>
          {
            user[0] 
            ? 
            <></>
            :
            <input type="password" className="input password" placeholder="비밀번호" id="guestPwd" value={post.guestPwd} onChange={onChange} disabled={isEditing ? true : false}></input>
          }
        </div>
        <TextField onChange={onChange} content={isEditing && postObj.content} isEditing={isEditing} text={text} setText={setText}/>
        <div>
          {
          isEditing ? 
            editedPost.attachedFiles  && <img className="img" src={imgBase64[0]}/>
            : 
            post.attachedFiles && <img className="img" src={imgBase64[0]}/>
          }
        </div>
        <div className="submit-box">
          <button className="submit" onClick={isEditing ? updatePost : (user[0] ? createPost : createPostByGuest)}>완료</button>
        </div>
      </PostEditorDiv>
  );
};

/*
<div className="submit-box">
          <div className="btn-box">
            <FiImage className="btn image" size="2rem" onClick={handleClick}/>
            <input 
              type="file" 
              accept ="image/jpg, image/jpeg, image/png, image/gif" 
              ref={photoInput}
              onChange={onChangeImage}
              style={{display: 'none'}}
            />
          </div>
          <button className="submit" onClick={isEditing ? updatePost : (user[0] ? createPost : createPostByGuest)}>완료</button>
        </div>
*/


export default PostEditor;

const PostEditorDiv = styled.div`

  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  font-size: 12px;

  .title-box {
    display: flex;
    justify-content: space-between;
    z-index: 100;
    width: 100%;
    height: 50px;
    padding: 15px 20px 15px 20px;
  }

  .title {
    height: 20px;
    font-size: 14px;
    font-weight: bold;
  }

  .categoryPicker {
    text-align: center;
    width: 80px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    padding-top: 1.5px;
    color: #000000;
  }

  .userInfo {
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0px 20px 0px 20px;
    border-top: 2px solid #444444;
    border-bottom: 2px solid #444444;
  }

  .input {
    height: 30px;
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.colors.text}; 
    font-size: 12px;
  }

  .input.nickname{
    width: 135px;
    border-right: 2px solid #444444;
    padding: 0;
  }

  .input.password{
    width: 160px; //닉네임이랑 비밀번호 너비 조정 필요 나중에 비율로 주기
    padding-left: 20px;
  }

  .input.content {
    width: 100%;
    min-height: 120px;
    size: 10; 
    padding: 10px 20px 0px 20px;
    border-bottom: 2px solid #444444;
  }

  .img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    padding: 0px 20px;
  }

  .submit-box {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 0px 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #444444;
  }

  .btn-box {
    display: flex;
    align-items: center;
  }

  .btn {
    margin-right: 10px;
  }

  .submit {
    width: 50px;
    height: 25px;
    padding-bottom: 2px;
    border-color: transparent;
    border-radius: 5px;
    background-color: #3498DB;
  }

    
`;
