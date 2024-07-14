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

const ErrorText = styled.p`
  color: red;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
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

  const { loading, error, data, refetch, fetchMore } = useQuery<{
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

  useEffect(() => {
    refetch({ name: searchTerm, page });
  }, [page, searchTerm, refetch]);
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <ErrorText>Error: {error.message}</ErrorText>}
      {characters.length > 0 && (
        <div>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />

          <CharactersList characters={characters} />

          <PaginationContainer>
            {Array.from({ length: pagesCount }, (_, index) => index + 1).map(
              (pageNum) => (
                <PaginationButton
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={page === pageNum}
                >
                  {pageNum}
                </PaginationButton>
              )
            )}
          </PaginationContainer>
        </div>
      )}
    </>
  );
};

export default Home;
