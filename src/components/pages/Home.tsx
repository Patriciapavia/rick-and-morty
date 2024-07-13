import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CharactersData, CharactersSchema, Character } from '../../schemas'; // Assuming you have defined CharactersSchema in schemas.ts

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
// type CharacterType = infer<typeof CharactersSchema>['characters']['results'][0];

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
const ErrorText = styled.p`
  color: red;
`;

const Characters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery<{ characters: CharactersData }>(GET_CHARACTERS, {
    variables: { name: searchTerm },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error: {error.message}</ErrorText>;

  try {
    const validatedData = CharactersSchema.parse(data);
    return (
      <div>
        <SearchInput
          type='text'
          placeholder='Search characters'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CharacterList>
          {validatedData.characters.results.map((character: Character) => (
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
  } catch (validationError) {
    console.error('Validation error:', validationError);
    return <ErrorText>Error: Invalid data received</ErrorText>;
  }
};


export default Characters;
