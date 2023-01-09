import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ShortRegister from './ShortRegister';

describe('<ShortRegister />', () => {
  test('it should mount', () => {
    render(<ShortRegister />);
    
    const shortRegister = screen.getByTestId('ShortRegister');

    expect(shortRegister).toBeInTheDocument();
  });
});