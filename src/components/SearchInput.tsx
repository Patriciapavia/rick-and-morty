import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  margin: 20px;
  padding: 10px;
  width: 80%;
  max-width: 400px;
`;

interface SearchBarProps {
  value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <SearchInput
      type="text"
      placeholder="Search characters"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;
