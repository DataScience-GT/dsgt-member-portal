import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsWelcome from './DocsWelcome';
import { BrowserRouter } from 'react-router-dom';

describe('<DocsWelcome />', () => {
  test('it should mount', () => {
    render(<DocsWelcome />, { wrapper: BrowserRouter });
    
    const docsWelcome = screen.getByTestId('DocsWelcome');

    expect(docsWelcome).toBeInTheDocument();
  });
});