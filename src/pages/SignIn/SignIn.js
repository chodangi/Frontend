import styled from "styled-components";
import Kakao from "./components/Kakao";
import Naver from "./components/Naver";

const SignIn = () => {

  return (
    <WrapDiv>
      <SignInDiv>
        로그인
      </SignInDiv>
      <Kakao />
    </WrapDiv>
  );
};

const WrapDiv = styled.div`
  margin:4rem 0
`

const SignInDiv = styled.div`
  margin:4rem 0;
  text-align: center;
  font-family: BlinkMacSystemFont,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size: 1.5em;
`

export default SignIn;
