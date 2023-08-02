import styled, { keyframes } from 'styled-components';
import { themes } from '@/styles/variables.module'

type props = {
    isDark: boolean
}

const Gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

export const HomeDiv = styled.div<props>`
    padding-top: 20px;
    min-height: calc(100vh - 60px);

    display: flex;
    justify-content: center;

    background: ${props => props.isDark ? 
    'linear-gradient(-45deg, #000428, #013b6d, #021661, #570091)' :
    'linear-gradient(-45deg, #E0EAFC, #CFDEF3, #E0C3FC, #B4ACFF)'
    };
    
    background-size: 400% 400%;
    animation: ${Gradient} 10s ease infinite;

    * {
        font-weight: lighter;
        color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
        text-align: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 1200px;
            h1 {
                font-family: 'Dosis';
                font-size: 76px;
                color: ${props => props.isDark ? themes.dark.fontColor : themes.light.fontColor};
                font-weight: bolder;
            }
            
            p {
                margin-top: 20px;
                font-size: 18px;
            }
        }

        .freeText {
            font-size: 36px;
            color: #08ca088a;
            font-weight: bolder;
            color: ${props => props.isDark ? '#00ff00b5' : '#0a330ac5'};
            filter: drop-shadow(10px 10px px rgba(0, 0, 0, 0.5));
        }
`