
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersList from '../components/CharactersList';
import { Character } from '../schemas';

const characters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    status: 'Alive',
    __typename: 'Character',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
    status: 'Alive',
    __typename: 'Character',
  },
];

describe('CharactersList component', () => {
  it('renders the component correctly', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
  });

  it('displays a list of character cards', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    );

    const characterCards = screen.getAllByRole('link');
    expect(characterCards).toHaveLength(characters.length);
  });

  it('each character card is rendered with correct data', () => {
    render(
      <MemoryRouter>
        <CharactersList characters={characters} />
      </MemoryRouter>
    );

    characters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      const image = screen.getByAltText(character.name);
      expect(image).toHaveAttribute('src', character.image);
    });
  });
});
