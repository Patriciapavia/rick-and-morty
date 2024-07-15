
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import { Character } from '../schemas';

const character: Character = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  species: 'Human',
  status: 'Alive',
  __typename: 'Character',
};

describe('CharacterCard component', () => {
  it('renders the component correctly', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Human/i)).toBeInTheDocument();
    expect(screen.getByText(/Alive/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('displays the character image with correct attributes', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    const image = screen.getByAltText(/Rick Sanchez/i);
    expect(image).toHaveAttribute('src', character.image);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '200');
  });

  it('has a link to the character detail page', () => {
    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Rick Sanchez/i });
    expect(link).toHaveAttribute('href', `/character/${character.id}`);
  });
});
