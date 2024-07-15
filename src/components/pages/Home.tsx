import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { CharactersData, CharactersSchema, Character } from '../../schemas'; // Assuming you have defined CharactersSchema in schemas.ts
import CharactersList from '../CharactersList';
import SearchBar from '../SearchInput';
import Spinner from '../Spinner';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';

export const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $page: Int!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
        prev
        pages
        count
        __typename
      }
      results {
        id
        name
        image
        species
        status
        __typename
      }
      __typename
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const NoCharactersFound = styled.p`
  color: gray;
  text-align: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  const {
    loading = true,
    error,
    data,
    refetch,
    fetchMore,
  } = useQuery<{
    characters: CharactersData;
  }>(GET_CHARACTERS, {
    variables: { name: searchTerm, page },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const validatedData = CharactersSchema.parse(data);
      setCharacters(validatedData.characters.results);
      setPagesCount(validatedData.characters.info.pages || 0);
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page when the search term changes
    setCharacters([]); // Clear the characters list when the search term changes
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === page) return;
      setPage(newPage);
      fetchMore({
        variables: { name: searchTerm, page: newPage },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const validatedData = CharactersSchema.parse(fetchMoreResult);
          setCharacters(validatedData.characters.results);
          return fetchMoreResult;
        },
      });
    },
    [fetchMore, page, searchTerm]
  );

  const getPageGroup = (group: number) => {
    const start = (group - 1) * 5 + 1;
    return Array.from(
      { length: Math.min(5, pagesCount - start + 1) },
      (_, index) => start + index
    );
  };

  useEffect(() => {
    refetch({ name: searchTerm, page });
  }, [page, searchTerm, refetch]);

  useEffect(() => {
    if (data) {
      const validatedData = CharactersSchema.parse(data);
      setCharacters(validatedData.characters.results);
      setPagesCount(validatedData?.characters?.info?.pages || 0);
    }
  }, [data]);

  return (
    <>
      <Box textAlign='center' fontSize='xl' fontWeight='bold' p={4}>
        Rick and Morty Characters
      </Box>
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
      {loading && <Spinner />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          Error: {error.message}
        </Alert>
      )}

      {!loading && !error && characters.length === 0 && (
        <NoCharactersFound>No characters found</NoCharactersFound>
      )}
      {data && (
        <div>
          <CharactersList characters={characters} />
          <PaginationContainer>
            <PaginationButton
              onClick={() =>
                setCurrentPageGroup((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentPageGroup === 1}
            >
              {'<'}
            </PaginationButton>
            {getPageGroup(currentPageGroup).map((pageNum) => (
              <PaginationButton
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                disabled={page === pageNum}
              >
                {pageNum}
              </PaginationButton>
            ))}
            <PaginationButton
              onClick={() =>
                setCurrentPageGroup((prev) => {
                  const nextGroup = prev + 1;
                  return nextGroup <= Math.ceil(pagesCount / 5)
                    ? nextGroup
                    : prev;
                })
              }
              disabled={currentPageGroup === Math.ceil(pagesCount / 5)}
            >
              {'>'}
            </PaginationButton>
          </PaginationContainer>
        </div>
      )}
    </>
  );
};

export default Home;
