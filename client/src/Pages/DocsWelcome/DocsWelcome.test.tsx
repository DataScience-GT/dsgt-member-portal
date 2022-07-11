import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsWelcome from './DocsWelcome';

describe('<DocsWelcome />', () => {
  test('it should mount', () => {
    render(<DocsWelcome />);
    
    const docsWelcome = screen.getByTestId('DocsWelcome');

    expect(docsWelcome).toBeInTheDocument();
  });
});