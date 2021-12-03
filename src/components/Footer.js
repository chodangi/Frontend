import styled from "styled-components";

import { size } from "../styles/Theme";

const Footer = (props) => {
  console.log(props);
  console.log(props.theme.colors.gray__2);
  return (
    <FooterDiv theme={props.theme}>
      <p>
        코털(coter.com)은 사이트 내 모든 암호화폐 가격 및 투자 관련 정보에
        대하여 어떠한 책임도 부담하지 않습니다.
      </p>
      <p>
        디지털 자산 투자는 전적으로 본인의 책임이므로 이에 유의하시기 바랍니다.
      </p>
      <div className="footer-btn">
        <button>개인정보처리방침</button>
        <button>서비스 이용약관</button>
        <button>소개</button>
      </div>
      <p>피드백 또는 문의 : help@coter.com</p>
    </FooterDiv>
  );
};

export default Footer;

const FooterDiv = styled.div`
  width: 100%;
  height: 20rem;
  border: none;
  background-color: ${(props) => props.theme.colors.gray__2};
  color: ${(props) => props.theme.colors.gray__1};
  padding: 2rem;

  p {
    font-size: ${size.font_small};
    margin-bottom: 2rem;
    margin-top: 0;
  }
  .footer-btn {
    button {
      font-size: ${size.font_small};
      color: ${(props) => props.theme.colors.gray__1};
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      margin: 2rem 1rem 0 0;
    }
  }
`;
