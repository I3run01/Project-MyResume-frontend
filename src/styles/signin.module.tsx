import styled from "styled-components";

export const SigninDiv = styled.div`

    * {
        font-family: 'Dosis';
        font-size: 18px;
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 100vh;

    background-image: url('/images/bgImages/bgLogin.png');
    background-position: center center;
    background-size: cover;

    #container {
        display: flex;
        flex-direction: column;
        background-color: blue;

        padding: 40px;
        border-radius: 10px;

        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(7.9px);
        -webkit-backdrop-filter: blur(7.9px);
        border: 1px solid rgba(255, 255, 255, 0.3);

        .backButton {
            width: min-content;
            padding: 5px 5px 5px 0;

            filter: brightness(0%);

            :hover {
                filter: brightness(100%);
            }
        }

        input {
            border: none;
            border-bottom: 1px solid black;
            margin-bottom: 20px;

            padding: 5px;

            background: none;
        }

        #forgetPassword {
            :hover {
                cursor: pointer;
                color: blue;
            }
        }

        #GooglesLogin {
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


        }

        #submit {
            display: flex;
            justify-content: center;

            border-radius: 10px;
            border: 1px solid black;
            padding: 4px;

            margin-bottom: 40px;

            :hover {
                cursor: pointer;

                background-color: #b2fcb278;
            }

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