import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner';

describe('Spinner component', () => {
  it('renders the component correctly with default props', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle('height: 80vh');
    expect(spinnerElement).toHaveStyle('display: flex');
    expect(spinnerElement).toHaveStyle('justify-content: center');
    expect(spinnerElement).toHaveStyle('align-items: center');
  });

  it('renders the component with custom size and color', () => {
    render(<Spinner size='md' color='red' />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveStyle('height: 80vh');
    expect(spinnerElement).toHaveStyle('display: flex');
    expect(spinnerElement).toHaveStyle('justify-content: center');
    expect(spinnerElement).toHaveStyle('align-items: center');
  });
});
