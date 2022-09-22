import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';

describe('<Register />', () => {
  test('it should mount', () => {
    render(<Register />, { wrapper: BrowserRouter });
    
    const register = screen.getByTestId('Register');

    expect(register).toBeInTheDocument();
  });
});