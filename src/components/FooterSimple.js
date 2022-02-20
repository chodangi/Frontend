import styled from "styled-components";

import { size } from "../styles/Theme";

const FooterSimple = (props) => {
  const scrollToTop = () =>{
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });
    };

  return (
    <FooterSimpleDiv theme={props.theme}>
      <div className="footer-btn1">
        <button onClick={scrollToTop}>맨 위로</button>
      </div>
      <div className="footer-btn2">
        <button>개인정보처리방침</button>
        <button>서비스 이용약관</button>
        <button>소개</button>
      </div>
      <p>피드백 또는 문의 : help@coter.com</p>
    </FooterSimpleDiv>
  );
};

export default FooterSimple;

const FooterSimpleDiv = styled.div`
  background-color: ${(props) => props.theme.colors.gray__2};
  border: none;
  color: ${(props) => props.theme.colors.gray__1};
  padding: 0rem 1.5rem 0rem 1.5rem;
  margin: 5rem 0;
  width: 100vw;

  .footer-btn1 {
    display: flex;
    justify-content: flex-end;

    button {
      background-color: transparent;
      border: none;
      color: ${(props) => props.theme.colors.gray__1};
      cursor: pointer;
      font-size: ${size.font_small};
      margin: 1rem 1rem 0 0;
      padding: 0;
    }
  }
   
  p {
    font-size: ${size.font_small};
    margin-bottom: 1rem;
    margin-top: 0;
  }
  .footer-btn2 {
    button {
      background-color: transparent;
      border: none;
      color: ${(props) => props.theme.colors.gray__1};
      cursor: pointer;
      font-size: ${size.font_small};
      margin: 1rem 1rem 0 0;
      padding: 0;
    }
  }
`;
