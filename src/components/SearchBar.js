import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import {AiOutlineSearch} from 'react-icons/ai';

const SearchBar = () =>{

    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("제목+내용");

    const openMenu = () =>{
        if(open) setOpen(false);
        else setOpen(true);
    }

    const selectMenu = (e) =>{
        const {target: {className}} = e;
        if (className === "writer")
            setLabel("글쓴이");
        else if(className === "title-content") 
            setLabel("제목+내용");
        setOpen(false);
    }

    const [text, setText] = useState('');

    const onChangeText = (e) => {
        setText(e.target.value);
        console.log(text)
    }

    const navigate = useNavigate();

    const searchPost = () => {
        if(label === '글쓴이') {
            navigate(`/search/posts-by-nickname/${text}`);
        } else {
            navigate(`/search/posts-by-keyword/${text}`);
        }
    }

    return (
        <SearchDiv>
            <DropdownDiv>
                <div className="searchbar__menu" onClick={openMenu}>{label}</div>
                {open ?
                    <ul>
                        <li className="title-content" onClick={selectMenu}>제목+내용</li>
                        <li className="writer" onClick={selectMenu}>글쓴이</li>
                    </ul> 
                    : <></>
                }
            </DropdownDiv>
            <input type="text" className="text__input" placeholder="검색어를 입력하세요." value={text} onChange={onChangeText}></input>
            <AiOutlineSearch className="search__icon" onClick={searchPost}/>
        </SearchDiv>
    );
}

export default SearchBar;

const SearchDiv = styled.div`
    position: relative;
    display: flex;
    //justify-content: center;
    //align-items:center;
    width: 300px;
    border-radius: 5px;
    background-color: #ffffff;
    z-index:100;

    .text__input{
        border: none;
        font-size: 12px;
    }

    .search__icon{
        position: absolute;
        right: 5px;
        width: 20px;
        height: 20px;
        color: black;
    }
`

const DropdownDiv = styled.div`
    position: relative;
    justify-content: center;
    align-items: center;    
    width: 90px;
    height: 18px;
    border-radius: 5px;
    border: 1px solid black;
    font-size:12px;
    color: black;
    margin: 1px 5px 1px 2px;
    
    .searchbar__menu{
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    ul{
        position: absolute;
        left: -2px;
        display: flex;
        flex-direction: column;
        width: 94px;
        height: 45px;
        background-color: white;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        padding:0;
        border-radius: 5px;
    }

    li{
        width: 90px;
        height: 18px;
        list-style: none;
        text-align: center;
        margin-right: 0px;
        border: 1px solid black;
        border-radius: 5px;
    }

    li.writer{
        margin-top: 5px;
    }
`