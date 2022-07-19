import React, {memo} from 'react';
import styled from "styled-components";

const Styled = styled.button`
  background-color: #F0CA81;
  color:#221C1D;
  font-size: 14px;
  font-weight: 500;
  -webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;
  padding: 8px 16px;
  border:none;
  cursor: pointer;
  min-width: 150px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Button = ({...rest}) => {
    return (
        <Styled {...rest} />
    );
};

export default memo(Button);