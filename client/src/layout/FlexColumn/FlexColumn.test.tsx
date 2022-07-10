import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlexColumn from './FlexColumn';

describe('<FlexColumn />', () => {
  test('it should mount', () => {
    render(<FlexColumn />);
    
    const flexColumn = screen.getByTestId('FlexColumn');

    expect(flexColumn).toBeInTheDocument();
  });
});