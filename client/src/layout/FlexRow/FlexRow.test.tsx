import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlexRow from './FlexRow';

describe('<FlexRow />', () => {
  test('it should mount', () => {
    render(<FlexRow />);
    
    const flexRow = screen.getByTestId('FlexRow');

    expect(flexRow).toBeInTheDocument();
  });
});