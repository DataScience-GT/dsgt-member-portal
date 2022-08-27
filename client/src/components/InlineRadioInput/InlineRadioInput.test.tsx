import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InlineRadioInput from './InlineRadioInput';

describe('<InlineRadioInput />', () => {
  test('it should mount', () => {
    render(<InlineRadioInput />);
    
    const inlineRadioInput = screen.getByTestId('InlineRadioInput');

    expect(inlineRadioInput).toBeInTheDocument();
  });
});