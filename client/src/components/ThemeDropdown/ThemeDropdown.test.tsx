import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemeDropdown from './ThemeDropdown';

describe('<ThemeDropdown />', () => {
  test('it should mount', () => {
    render(<ThemeDropdown />);
    
    const themeDropdown = screen.getByTestId('ThemeDropdown');

    expect(themeDropdown).toBeInTheDocument();
  });
});