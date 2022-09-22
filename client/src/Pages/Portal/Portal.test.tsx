import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Portal from './Portal';
import { BrowserRouter } from 'react-router-dom';

describe('<Portal />', () => {
  test('it should mount', () => {
    render(<Portal />, { wrapper: BrowserRouter });
    
    const portal = screen.getByTestId('Portal');

    expect(portal).toBeInTheDocument();
  });
});