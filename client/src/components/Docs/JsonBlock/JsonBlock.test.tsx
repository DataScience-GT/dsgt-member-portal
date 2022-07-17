import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JsonBlock from './JsonBlock';

describe('<JsonBlock />', () => {
  test('it should mount', () => {
    render(<JsonBlock />);
    
    const jsonBlock = screen.getByTestId('JsonBlock');

    expect(jsonBlock).toBeInTheDocument();
  });
});