import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CharactersData, CharactersSchema, Character } from '../../schemas'; // Assuming you have defined CharactersSchema in schemas.ts
import CharactersList from '../CharactersList';
import SearchBar from '../SearchInput';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $page: Int!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
      }
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

const ErrorText = styled.p`
  color: red;
`;

const Characters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<{ characters: CharactersData }>(GET_CHARACTERS, {
    variables: { name: searchTerm, page },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const validatedData = CharactersSchema.parse(data);
      if (page === 1) {
        setCharacters(validatedData.characters.results);
      } else {
        setCharacters((prev) => [...prev, ...validatedData.characters.results]);
      }
      setIsFetchingMore(false);
    },
  });

  const handleLoadMore = useCallback(() => {
    setIsFetchingMore(true);
    fetchMore({
      variables: {
        page: page + 1,
        name: searchTerm,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const validatedData = CharactersSchema.parse(fetchMoreResult);
        return {
          characters: {
            ...fetchMoreResult.characters,
            results: [
              ...prev.characters.characters.results,
              ...validatedData.characters.results,
            ],
          },
        };
      },
    });
    setPage((prevPage) => prevPage + 1);
  }, [data, fetchMore, searchTerm]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetchingMore
    )
      return;
    handleLoadMore();
  }, [isFetchingMore, handleLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorText>Error: {error.message}</ErrorText>;

  try {
    return (
      <div>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CharactersList characters={characters} />
        {isFetchingMore && <p>Loading more...</p>}
      </div>
    );
  } catch (validationError) {
    console.error('Validation error:', validationError);
    return <ErrorText>Error: Invalid data received</ErrorText>;
  }
};

export default Characters;
