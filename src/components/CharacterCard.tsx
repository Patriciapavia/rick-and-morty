import React from 'react';
import styled from 'styled-components';
import { Character } from '../schemas'; // Assuming you have defined Character type in schemas.ts
import { Link } from 'react-router-dom';

const CharacterCardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 200px;
  text-align: center;
`;

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <CharacterCardContainer>
      <Link to={`/character/${character.id}`}>
        <img
          src={character.image}
          alt={character.name}
          loading='lazy'
          width={200}
          height={200}
        />
        <h3>{character.name}</h3>
        <p>{character.species}</p>
        <p>{character.status}</p>
      </Link>
    </CharacterCardContainer>
  );
};

export default CharacterCard;
