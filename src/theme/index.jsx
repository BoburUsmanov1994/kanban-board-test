import React from 'react';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  body {
    color: #221C1D;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    background-color: #F9F9F9;
  }
  
 .text-center{
   text-align: center;
 }
 .select__file{
   padding: 15px;
   border:1px dashed #fff;
   margin-top: 5px;
   margin-bottom: 5px;
 }
  
`;
const Theme = ({children}) => {
    return (
        <ThemeProvider theme={{}}>
            <GlobalStyles/>
            <ToastContainer />
                {children}
        </ThemeProvider>
    );
};

export default Theme;