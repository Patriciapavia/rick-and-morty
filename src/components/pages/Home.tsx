import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CharactersData, CharactersSchema } from '../../schemas'; // Assuming you have defined CharactersSchema in schemas.ts
import CharactersList from '../CharactersList';

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
        <CharactersList characters={validatedData.characters.results} />
      </div>
    );
  } catch (validationError) {
    console.error('Validation error:', validationError);
    return <ErrorText>Error: Invalid data received</ErrorText>;
  }
};


export default Characters;
