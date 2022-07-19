import React from 'react';
import styled from "styled-components";

const Styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal__backdrop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9;

  }
  .modal__content{
    width: 300px;
    padding: 30px;
    background-color: #fff;
    position: relative;
    z-index: 99;
    -webkit-border-radius: 15px;-moz-border-radius: 15px;border-radius: 15px;
  }
`;
const Modal = ({
                   ...rest
               }) => {
    return (
        <Styled {...rest}>
            <div className="modal__backdrop"></div>
            <div className="modal__content">

            </div>
        </Styled>
    );
};

export default Modal;