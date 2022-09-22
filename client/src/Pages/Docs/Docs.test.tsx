import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Docs from './Docs';
import { BrowserRouter } from 'react-router-dom';

describe('<Docs />', () => {
  test('it should mount', () => {
    render(<Docs />, { wrapper: BrowserRouter });
    
    const docs = screen.getByTestId('Docs');

    expect(docs).toBeInTheDocument();
  });
});