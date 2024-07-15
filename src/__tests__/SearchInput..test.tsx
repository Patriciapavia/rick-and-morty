
import { render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchInput';

describe('SearchBar component', () => {
  it('renders the component correctly', () => {
    render(<SearchBar value="" onChange={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/Search characters/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('displays the correct initial value', () => {
    render(<SearchBar value="Rick" onChange={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/Search characters/i);
    expect(inputElement).toHaveValue('Rick');
  });

});
