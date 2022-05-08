import React from 'react';
import styled from 'styled-components';

const SearchIcon = () => {
  return (
    <IconButton type='submit'>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="white"/>
        <path d="M24.625 22.75H23.6375L23.2875 22.4125C24.5125 20.9875 25.25 19.1375 25.25 17.125C25.25 12.6375 21.6125 9.00001 17.125 9.00001C12.6375 9.00001 8.99999 12.6375 8.99999 17.125C8.99999 21.6125 12.6375 25.25 17.125 25.25C19.1375 25.25 20.9875 24.5125 22.4125 23.2875L22.75 23.6375V24.625L29 30.8625L30.8625 29L24.625 22.75ZM17.125 22.75C14.0125 22.75 11.5 20.2375 11.5 17.125C11.5 14.0125 14.0125 11.5 17.125 11.5C20.2375 11.5 22.75 14.0125 22.75 17.125C22.75 20.2375 20.2375 22.75 17.125 22.75Z" fill="black"/>
        </svg>
    </IconButton>
  )
}

const IconButton = styled.button`
    width: 43px;
    height: 43px;
    border: none;
    background-color: #000;
    cursor: pointer;
`;

export default SearchIcon