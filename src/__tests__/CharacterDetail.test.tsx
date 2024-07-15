
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CharacterDetail, { GET_CHARACTER_DETAIL } from '../components/pages/CharacterDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const characterMock = {
  request: {
    query: GET_CHARACTER_DETAIL,
    variables: { id: '1' },
  },
  result: {
    data: {
      character: {
        id: '1',
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        species: 'Human',
        status: 'Alive',
        episode: [
          {
            id: '1',
            name: 'Pilot',
            air_date: 'December 2, 2013',
            episode: 'S01E01',
          },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_CHARACTER_DETAIL,
    variables: { id: '1' },
  },
  error: new Error('An error occurred'),
};

describe('CharacterDetail component', () => {
  it('renders the component correctly', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/character/1']}>
          <ChakraProvider>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays the loading spinner', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/character/1']}>
          <ChakraProvider>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );
   const spinner = screen.getByTestId('spinner');
   expect(spinner).toBeInTheDocument();
  });

  it('handles errors gracefully', async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/character/1']}>
          <ChakraProvider>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const alert = await waitFor(() => screen.findAllByTestId('error'));
    expect(alert).toHaveLength(1);
  });

  it('displays character details when data is available', async () => {
    render(
      <MockedProvider mocks={[characterMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/character/1']}>
          <ChakraProvider>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const characterName = await screen.findByText(/Rick Sanchez/i);
    expect(characterName).toBeInTheDocument();
    expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Status: Alive/i)).toBeInTheDocument();
    expect(screen.getByText(/S01E01: Pilot \(Air date: December 2, 2013\)/i)).toBeInTheDocument();
  });

  it('checks the "Back to home" link', async () => {
    render(
      <MockedProvider mocks={[characterMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/character/1']}>
          <ChakraProvider>
            <Routes>
              <Route path="/character/:id" element={<CharacterDetail />} />
              <Route path="/" element={<div>Home Page</div>} />
            </Routes>
          </ChakraProvider>
        </MemoryRouter>
      </MockedProvider>
    );

    const backButton = await screen.findByText(/Back to home/i);
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(await screen.findByText(/Home Page/i)).toBeInTheDocument();
  });
});
