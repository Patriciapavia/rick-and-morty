import React from 'react';
import styled from 'styled-components';
import { Character } from '../schemas';
import CharacterCard from './CharacterCard';

const CharacterListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface CharactersListProps {
    characters: Character[];
  }


  const CharactersList: React.FC<CharactersListProps> = ({ characters }) => {
    return (
      <CharacterListContainer>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </CharacterListContainer>
    );
  };

  export default CharactersList;