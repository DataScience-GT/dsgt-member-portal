import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SuccessText from './SuccessText';

describe('<SuccessText />', () => {
  test('it should mount', () => {
    render(<SuccessText />);
    
    const successText = screen.getByTestId('SuccessText');

    expect(successText).toBeInTheDocument();
  });
});