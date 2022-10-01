import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InlineLink from './InlineLink';

describe('<InlineLink />', () => {
  test('it should mount', () => {
    render(<InlineLink />);
    
    const inlineLink = screen.getByTestId('InlineLink');

    expect(inlineLink).toBeInTheDocument();
  });
});