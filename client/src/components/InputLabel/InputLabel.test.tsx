import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputLabel from './InputLabel';

describe('<InputLabel />', () => {
  test('it should mount', () => {
    render(<InputLabel />);
    
    const inputLabel = screen.getByTestId('InputLabel');

    expect(inputLabel).toBeInTheDocument();
  });
});