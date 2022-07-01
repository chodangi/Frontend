import styled from "styled-components";

import { size } from "../styles/Theme";

const Footer = (props) => {
  return (
    <FooterDiv theme={props.theme}>
      <p>
        코털(coinfortal.com)은 사이트 내 모든 암호화폐 가격 및 투자 관련 정보에
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
      <p>피드백 또는 문의 : coinfotal@gmail.com</p>
    </FooterDiv>
  );
};

export default Footer;

const FooterDiv = styled.div`
  background-color: ${(props) => props.theme.colors.gray__2};
  border: none;
  color: ${(props) => props.theme.colors.gray__1};
  padding: 10px 20px;
  width: 100%;
  margin-top: 15px;

  p {
    font-size: 12px;
    margin-bottom: 7px;
  }
  .footer-btn {
    button {
      background-color: transparent;
      border: none;
      color: ${(props) => props.theme.colors.gray__1};
      cursor: pointer;
      //font-size: ${size.font_small};
      font-size: 12px;
      margin: 5px 10px 0 0;
      padding: 0;
    }
  }
`;
