import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsApi from './DocsApi';
import { BrowserRouter } from 'react-router-dom';

describe('<DocsApi />', () => {
  test('it should mount', () => {
    render(<DocsApi />, { wrapper: BrowserRouter });
    
    const docsApi = screen.getByTestId('DocsApi');

    expect(docsApi).toBeInTheDocument();
  });
});