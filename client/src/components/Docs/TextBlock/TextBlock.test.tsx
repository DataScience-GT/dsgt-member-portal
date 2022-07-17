import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextBlock from './TextBlock';

describe('<TextBlock />', () => {
  test('it should mount', () => {
    render(<TextBlock />);
    
    const textBlock = screen.getByTestId('TextBlock');

    expect(textBlock).toBeInTheDocument();
  });
});