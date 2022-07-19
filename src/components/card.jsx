import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  padding: 16px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #F9F9F9;
`;
const Card = ({children, ...rest}) => {
    return (
        <Styled {...rest}>

        </Styled>
    );
};

export default Card;