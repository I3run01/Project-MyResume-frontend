import styled, { keyframes } from 'styled-components';

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

type props = {
    mathPassword: boolean
}

export const ResetPasswordDiv = styled.div<props>`
    * {
        font-family: 'Dosis';
        font-size: 18px;
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background: linear-gradient(-45deg, #000428, #013b6d, #021661, #570091);
    background-size: 400% 400%;
    animation: ${Gradient} 10s ease infinite;


    #container {
        display: flex;
        flex-direction: column;

        padding: 20px 40px 40px 20px;
        border-radius: 10px;     

        /* From https://css.glass */
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(7.9px);
        -webkit-backdrop-filter: blur(7.9px);
        border: 1px solid rgba(255, 255, 255, 0.3);

        .backButton {
            width: min-content;
            padding: 1px 5px 5px 0;

            filter: brightness(0%);

            &:hover {
                filter: brightness(100%);
            }
        }

        input {
            border: none;
            border-bottom: 1px solid black;
            margin-bottom: 0px;

            padding: 5px;

            background: none;
        }

        #forgetPassword {
            &:hover {
                cursor: pointer;
                color: blue;
            }
        }


        #submit {
            display: flex;
            justify-content: center;

            border-radius: 10px;
            border: 1px solid black;
            padding: 4px;

            margin-bottom: 40px;

            &:hover {
                cursor: pointer;

                background-color: #b2fcb278;
            }

        }

        .mathPassword {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 12px;
            color: ${props => props.mathPassword ? 'green' : 'red'};
        }
    }

    @media screen and (min-width: 500px) {
        #container {
            input {
                width: 300px;
            }
        }
    }


`