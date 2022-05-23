import React,{useState} from 'react'
import styled from "styled-components";
import { FaSearch } from 'react-icons/fa';
import api from '../../../api/api';

function TemperatureSearch({type, getSearchComment}) {

    const [Search, setSearch] = useState("")

    const onSearchHandler = (event) => {
        setSearch(event.target.value)
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault()
        if (Search.length > 0) {
            const data = await api.get(encodeURI(`/temper/comments/keyword/${type}?size=10&page=0&keyword=${Search}`))
            getSearchComment(data, Search)
            setSearch("")
        }
    }

    return (
        <TemperatureSearchBox>
            <button onClick={onSubmitHandler}><FaSearch style={{color:"rgb(166, 166, 166)"}} /></button>
            <input type="text" value={Search} onChange={onSearchHandler} />
        </TemperatureSearchBox>
    )
}

const TemperatureSearchBox = styled.div`
    width:36%;
    heigth:30px;
    display:flex;

    input{
        height:100%;
        width:77%;
        border:0px;
        border-radius: 0px 3px 0px 0px;
        outline:none;
        padding-left:10px;
    }
    
    button{
        height:100%;
        border:0px;
        width:23%;
        border-radius: 3px 0px 0px 0px;
    }
`

export default TemperatureSearch