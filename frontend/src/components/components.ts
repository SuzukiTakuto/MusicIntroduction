import styled from 'styled-components';

export const Button = styled.button<{buttonValue: string, nowGenre: string}>`
    max-width: 157px;
    width: 46.6%;
    height: 27px;
    border-radius: 10px;
    border: none;
    background-color: #000;
    font-size: 14px;
    font-weight: bold;
    display: block;
    box-sizing: border-box;
    color: #fff;
    opacity: ${({buttonValue, nowGenre}) => buttonValue === nowGenre ? "1" : "0.7"};
    padding-left: 5%;
    cursor: pointer;
    transition: .2s;
    margin-bottom: 7px;

    &:hover {
        opacity: 1;
    }
`;

export const Input = styled.div`
    margin: 40px 0 ;
    > input {
        width: 100%;
        height: 35px;
        border: 1px solid ${({color}) => color ? color : "#2BAD62"};
        border-radius: 10px;
        padding-left: 10px;
    }
`;

export const FormHeader = styled.h1`
    font-size: 40px;
    text-align: center;
`;

export const Container = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
`;

export const Form = styled.form`
  width: 300px;
`;