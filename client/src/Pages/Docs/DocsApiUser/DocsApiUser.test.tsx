import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsApiUser from './DocsApiUser';
import { BrowserRouter } from 'react-router-dom';

describe('<DocsApiUser />', () => {
  test('it should mount', () => {
    render(<DocsApiUser />, { wrapper: BrowserRouter });
    
    const docsApiUser = screen.getByTestId('DocsApiUser');

    expect(docsApiUser).toBeInTheDocument();
  });
});