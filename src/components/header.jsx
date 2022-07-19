import React, {memo} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const StyledHeader = styled.header`
  padding: 15px 30px;
  box-shadow: rgb(0 0 0 / 6%) 0px 50px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo{
    font-weight: 700;
    font-size: 24px;
    margin-right: 15px;
    color: #F0CA81;
  }
  .menu{
    display: flex;
    &__item{
      margin-right: 30px;
      a{
        color: #221C1D;
        &.active{
          color: #F0CA81;
        }
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
`;
const Header = ({
                    ...rest
                }) => {
    return (
        <StyledHeader {...rest}>
            <NavLink to={"/"} className={'logo'}>Logo</NavLink>
            <ul className={'menu'}>
                <li className={'menu__item'}>
                    <NavLink to={"/"}>Kanban from scratch</NavLink>
                </li>
                <li className={'menu__item'}>
                    <NavLink to={"/library"}>Kanban with library</NavLink>
                </li>
            </ul>
        </StyledHeader>
    );
};

export default memo(Header);