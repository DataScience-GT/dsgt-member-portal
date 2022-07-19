import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Portal from './Portal';

describe('<Portal />', () => {
  test('it should mount', () => {
    render(<Portal />);
    
    const portal = screen.getByTestId('Portal');

    expect(portal).toBeInTheDocument();
  });
});