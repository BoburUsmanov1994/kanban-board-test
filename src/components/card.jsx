import React, {memo} from 'react';
import styled from "styled-components";
import CardItem from "./card-item";
import Button from "./button";
import {get} from "lodash";

const Styled = styled.div`
  padding: 16px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #E5E5E5;
  width: 300px;
  margin-right: 40px;


  &:last-child {
    margin-right: 0;
  }

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
  }

  .text-center {
    margin-top: 30px;
  }
`;
const Card = ({
                  title = "",
                  hasAddBtn = false,
                  tasks = [],
                  dragStartHandler = () => {},
                  dragLeaveHandler = () => {},
                  dragEndHandler = () => {},
                  dragOverHandler = () => {},
                  dropHandler = () => {},
                  board,
                  ...rest
              }) => {
    return (
        <Styled {...rest}>
            <h2>{title}</h2>
            {
                tasks && tasks.map(task => <CardItem
                    board={board}
                    key={get(task, 'id')}
                    data={task}
                    dragStartHandler={dragStartHandler}
                    dragLeaveHandler={dragLeaveHandler}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                />)
            }
            {hasAddBtn && <div className="text-center">
                <Button>New+</Button>
            </div>}
        </Styled>
    );
};

export default memo(Card);