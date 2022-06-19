import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Kakao from "./components/Kakao";

const SignIn = () => {

  const contentHeight = (window.innerHeight - 190) + "px" ;

  return (
    <SigninDiv>
      <div className="login" style={{minHeight: contentHeight}}>
        <Header/>
        <Kakao className="kakao"/>
      </div>
      <Footer/>
    </SigninDiv>
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

const SigninDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;

  max-width: 600px;
  width: 100vw;
  height: 100%;

  .login{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
    
`;
