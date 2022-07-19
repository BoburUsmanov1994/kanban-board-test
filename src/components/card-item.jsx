import React, {memo} from 'react';
import styled from "styled-components";

const Styled = styled.div`

`;
const CardItem = ({
                      item = {},
                      ...rest
                  }) => {
    return (
        <Styled {...rest}>

        </Styled>
    );
};

export default memo(CardItem);