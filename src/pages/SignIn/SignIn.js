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
