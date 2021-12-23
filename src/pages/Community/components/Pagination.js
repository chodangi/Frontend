import React from "react";
import styled from "styled-components";

const Pagination = ({postPerPage, totalPosts, paginate}) => {

    const pageNumbers = [];

    for(var i = 1; i < Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <PageNav>
            <ul className="pagination">
                {pageNumbers.map(num =>
                <li key={num}>
                    <a onClick={() => paginate(num)} href="!#">{num}</a>
                </li>)}
            </ul>
        </PageNav>
    );
}

const PageNav = styled.nav`
    width: 320px; //비율로바꾸기
    height: 30px;

    ul{
        display: flex;
        list-style:none;
    }

    li{
        text-decoration: none;
        color: ${(props) => props.theme.colors.text};
        font-size:14px;
        //font-weight: bold;
        //border-right: 1px solid #888888;
        text-align: center;
        text-align-vertical: center;
    }
`

export default Pagination;