// 액션 관리 모듈 
import { createAction, handleActions } from "redux-actions";

// 불변성 관리 패키지
import { produce } from "immer";

// axios
import axios from 'axios';

// Actions
// 별점을 기록하는 액션
const SET_STAR = "SET_STAR";
// 리뷰 텍스트를 기록하는 액션
const WRITE_TEXT = "WRITE_TEXT";
// 해당 상세 페이지의 리뷰 리스트를 조회하는 액션
const GET_REVIEW = "GET_REVIEW";
// 기존 리뷰를 수정하는 액션
const EDIT_REVIEW = "EDIT_REVIEW";

//test
const INCREASE = "counter2/INCREASE"; 
const initialState = { value: 0, }; 
export const increase = (num) => ({ 
    type: INCREASE, number: num,
}); 

export default function counter2(state = initialState, action) { 
    switch (action.type) { 
        case INCREASE: 
            return { ...state, value: state.value + parseInt(action.number) }; 
        default: 
            return state; 
    } 
}

