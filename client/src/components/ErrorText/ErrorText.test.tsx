import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorText from './ErrorText';

describe('<ErrorText />', () => {
  test('it should mount', () => {
    render(<ErrorText />);
    
    const errorText = screen.getByTestId('ErrorText');

    expect(errorText).toBeInTheDocument();
  });
});