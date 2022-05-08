import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/components';

type Props = {
    genre: string;
    setGenre: React.Dispatch<React.SetStateAction<string>>;
};

const buttons = [
    {
        value: "artist",
        displayName: "アーティスト",
    },
    {
        value: "track",
        displayName: "曲",
    }
];

const Genre = (props: Props) => {
  const genreClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.setGenre(e.currentTarget.value);
  }

  return (
    <>
        <Container>
            {buttons.map((button) => (
                <Button type='button' value={button.value} buttonValue={button.value} nowGenre={props.genre} onClick={(e) => genreClick(e)}>{button.displayName}</Button>
            ))}
        </Container>
    </>
  )
}

const Container = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export default Genre