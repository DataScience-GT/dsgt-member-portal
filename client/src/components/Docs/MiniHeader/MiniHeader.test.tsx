import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MiniHeader from './MiniHeader';

describe('<MiniHeader />', () => {
  test('it should mount', () => {
    render(<MiniHeader />);
    
    const miniHeader = screen.getByTestId('MiniHeader');

    expect(miniHeader).toBeInTheDocument();
  });
});