import styled from "styled-components";

const fontColorDark = '#ececec'
const fontColorLight = 'black'

type props = {
    isDark: boolean
}

export const SettingsDiv = styled.div<props>`
    
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    color: ${props => props.isDark ? fontColorDark : fontColorLight};

    font-size: 18px;
    font-family: 'Dosis';

    .back {
        display: flex;
        justify-content: start;
        align-self: flex-start;

        padding: 5px 15px 5px 15px;
        
        margin-top: 30px;
        margin-left: 15%;

        cursor: pointer;

        border: 2px solid ${props => props.isDark ? fontColorDark : fontColorLight};
        border-radius: 5px;

        &:hover {
            background-color: #8585854a;
        }
    }

    .clickable {
        display: flex;
        justify-content: center;

        padding: 3px;
        border: 2px solid ${props => props.isDark ? fontColorDark : fontColorLight};
        border-radius: 5px;

        margin-top: 30px;

        width: 70%;

        cursor: pointer;

        &:hover {
            background-color: #8585854a;
        }
    }


    
`