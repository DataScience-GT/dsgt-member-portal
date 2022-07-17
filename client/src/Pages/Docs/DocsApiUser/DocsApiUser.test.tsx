import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsApiUser from './DocsApiUser';

describe('<DocsApiUser />', () => {
  test('it should mount', () => {
    render(<DocsApiUser />);
    
    const docsApiUser = screen.getByTestId('DocsApiUser');

    expect(docsApiUser).toBeInTheDocument();
  });
});