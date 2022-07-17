import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsApi from './DocsApi';

describe('<DocsApi />', () => {
  test('it should mount', () => {
    render(<DocsApi />);
    
    const docsApi = screen.getByTestId('DocsApi');

    expect(docsApi).toBeInTheDocument();
  });
});