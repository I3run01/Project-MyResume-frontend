import styled from "styled-components";

export const GoogleButtonStyled = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 12px;
    border: 1px solid black;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

    padding-top: 0;

    background-color: #d4d4d4;

    width: 200px;

    :hover {
        cursor: pointer;
        background-color: #f3f3f3;
    }  
`