import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MiniText from './MiniText';

describe('<MiniText />', () => {
  test('it should mount', () => {
    render(<MiniText />);
    
    const miniText = screen.getByTestId('MiniText');

    expect(miniText).toBeInTheDocument();
  });
});