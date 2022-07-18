import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputHelper from './InputHelper';

describe('<InputHelper />', () => {
  test('it should mount', () => {
    render(<InputHelper />);
    
    const inputHelper = screen.getByTestId('InputHelper');

    expect(inputHelper).toBeInTheDocument();
  });
});