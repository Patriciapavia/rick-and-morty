import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        species
        status
      }
    }
  }
`;

const CharacterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CharacterCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 200px;
  text-align: center;
`;

const CharacterImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

const SearchInput = styled.input`
  margin: 20px;
  padding: 10px;
  width: 80%;
  max-width: 400px;
`;

const Characters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: searchTerm },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : (</p>;
  return (
    <div>
      <SearchInput
        type='text'
        placeholder='Search characters'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CharacterList>
        {data.characters.results.map((character: any) => (
          <CharacterCard key={character.id}>
            <CharacterImage src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
            <p>{character.species}</p>
            <p>{character.status}</p>
          </CharacterCard>
        ))}
      </CharacterList>
    </div>
  );
};

export default Characters;
