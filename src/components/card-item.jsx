import React, {memo} from 'react';
import styled from "styled-components";
import {get} from "lodash"

const Styled = styled.div`
  background-color: #fff;
  padding: 15px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #221C1D;
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;
const CardItem = ({
                      data = {},
                      dragStartHandler = () => {
                      },
                      dragEndHandler = () => {
                      },
                      dragOverHandler = () => {
                      },
                      dropHandler = () => {
                      },
                      board = {},
                      ...rest
                  }) => {
    return (
        <Styled {...rest}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, board, data)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board, data)}
        >
            <h3>{get(data, 'title')}</h3>
            <p>{get(data, 'description')}</p>
        </Styled>
    );
};

export default memo(CardItem);