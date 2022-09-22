import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MiniHeader from './MiniHeader';
import { BrowserRouter } from 'react-router-dom';

describe('<MiniHeader />', () => {
  test('it should mount', () => {
    render(<MiniHeader />, { wrapper: BrowserRouter });
    
    const miniHeader = screen.getByTestId('MiniHeader');

    expect(miniHeader).toBeInTheDocument();
  });
});