import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InlineTextBlock from './InlineTextBlock';

describe('<InlineTextBlock />', () => {
  test('it should mount', () => {
    render(<InlineTextBlock />);
    
    const inlineTextBlock = screen.getByTestId('InlineTextBlock');

    expect(inlineTextBlock).toBeInTheDocument();
  });
});