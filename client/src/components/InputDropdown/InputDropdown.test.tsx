import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputDropdown from './InputDropdown';

describe('<InputDropdown />', () => {
  test('it should mount', () => {
    render(<InputDropdown />);
    
    const inputDropdown = screen.getByTestId('InputDropdown');

    expect(inputDropdown).toBeInTheDocument();
  });
});