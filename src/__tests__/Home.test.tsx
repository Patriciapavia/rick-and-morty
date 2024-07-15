
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Home from '../components/pages/Home';
import { GET_CHARACTERS } from '../components/pages/Home';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const mocks = [
    {
      request: {
        query: GET_CHARACTERS,
        variables: { name: '', page: 1 },
      },
      result: {
        data: {
          characters: {
            info: {
              next: 2,
              prev: null,
              pages: 2,
              count: 20,
              __typename: 'Info',
            },
            results: [
              {
                id: '1',
                name: 'Rick Sanchez',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                species: 'Human',
                status: 'Alive',
                __typename: 'Character',
              },
            ],
            __typename: 'Characters',
          },
        },
      },
    },
    {
      request: {
        query: GET_CHARACTERS,
        variables: { name: '', page: 2 },
      },
      result: {
        data: {
          characters: {
            info: {
              next: null,
              prev: 1,
              pages: 2,
              count: 20,
              __typename: 'Info',
            },
            results: [
              {
                id: '2',
                name: 'Morty Smith',
                image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                species: 'Human',
                status: 'Alive',
                __typename: 'Character',
              },
            ],
            __typename: 'Characters',
          },
        },
      },
    },
  ];
describe('Home component', () => {
  it('renders the component correctly', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/Rick and Morty Characters/i)).toBeInTheDocument();
  });

  it('displays the loading spinner', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument;
  });

  it('handles errors gracefully', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { name: '', page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Error: An error occurred');
  });

  it('displays "No characters found" when there are no results', async () => {
    const noResultsMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { name: 'Unknown Character', page: 1 },
        },
        result: {
          data: {
            characters: {
              info: {
                next: null,
                prev: null,
                pages: 1,
                count: 0,
                __typename: 'Info',
              },
              results: [],
              __typename: 'Characters',
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={noResultsMocks} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(searchInput, { target: { value: 'Unknown Character' } });

    const noResultsMessage = await screen.findByText(/No characters found/i);
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('displays the character list when data is available', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const characterName = await screen.findByText(/Rick Sanchez/i);
    expect(characterName).toBeInTheDocument();
  });

  it('pagination buttons work correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ChakraProvider>
            <Home />
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const nextPageButton = await screen.findByText(/2/i);
      fireEvent.click(nextPageButton);

      // Assert the new character name is displayed after clicking the pagination button
      const newCharacterName = await waitFor(() => screen.findByText(/Morty Smith/i));
      expect(newCharacterName).toBeInTheDocument();

  });
});
