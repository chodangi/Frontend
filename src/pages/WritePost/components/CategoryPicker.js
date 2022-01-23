import { useState } from "react";
import styled from "styled-components";

const CategoryPicker = (props) => {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(props.category);

    const openPicker = () => {
        if(open) setOpen(false);
        else setOpen(true);
    }

    const selectCategory = (e) => {
        const {target: {id}} = e;
        switch(id){
            case "popular-board": 
                setSelected('인기게시판');
                setOpen(false);
                break;
            case "free-board": 
                setSelected('자유게시판');
                setOpen(false);
                break;
            case "rich-board": 
                setSelected('부자게시판');
                setOpen(false);
                break;
            case "poor-board": 
                setSelected('그지게시판');
                setOpen(false);
                break;
        }
    }

    return (
        <PickerDiv>
          <Item onClick={openPicker}>{selected}</Item>
          {open ? 
            <div className="category-container">
                <Item onClick={selectCategory} id="popular-board">인기게시판</Item>  
                <Item onClick={selectCategory} id="free-board">자유게시판</Item>  
                <Item onClick={selectCategory} id="rich-board">부자게시판</Item>  
                <Item onClick={selectCategory} id="poor-board">그지게시판</Item> 
            </div> : <></>}
        </PickerDiv>
    );
}

export default CategoryPicker;

const PickerDiv = styled.div`
    
    width: 80px;
    min-height: 20px;
    max-height: 105px;
    color: black3;
    border-radius: 10px;

    .category-container {
        width: 80px;
        height: 80px;
        margin-top: 2px;
    }
`

const Item = styled.div`
    width: 80px;
    height: 20px;
    text-align: center;
    padding-top: 2px;
    background-color: #ffffff;
`