import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

export const Board: FC = () => {
  const { id } = useParams();
  return (
    <>
      <h2>Board with id: {id}</h2>
    </>
  );
};

export default Board;
