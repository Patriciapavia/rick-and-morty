import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CharacterDetailSchema } from '../../schemas';
import Spinner from '../Spinner';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const GET_CHARACTER_DETAIL = gql`
  query GetCharacterDetail($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  loading: 'lazy';
`;

const CharacterInfo = styled.div`
  margin-top: 20px;
`;

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id },
  });

  if (loading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error)
    return (
      <p>
        Error:
        <Alert status='error'>
          <AlertIcon />
        </Alert>
        {error.message}
      </p>
    );

  const validatedData = CharacterDetailSchema.parse(data);

  const { name, image, species, status, episode } = validatedData.character;

  return (
    <Container>
      <CharacterImage src={image} alt={name} />
      <CharacterInfo>
        <h2>{name}</h2>
        <p>Species: {species}</p>
        <p>Status: {status}</p>
        <h3>Episodes</h3>
        <ul>
          {episode.map((ep) => (
            <li key={ep.id}>
              {ep.episode}: {ep.name} (Air date: {ep.air_date})
            </li>
          ))}
        </ul>
      </CharacterInfo>
      <ChakraLink
        as={RouterLink}
        to='/'
        color='blue.500'
        fontSize='lg'
        fontWeight='bold'
        _hover={{ textDecoration: 'underline' }}
      >
        Back to home
      </ChakraLink>
    </Container>
  );
};

export default CharacterDetail;
