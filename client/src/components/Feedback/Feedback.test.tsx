import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Feedback from './Feedback';

describe('<Feedback />', () => {
  test('it should mount', () => {
    render(<Feedback />);
    
    const feedback = screen.getByTestId('Feedback');

    expect(feedback).toBeInTheDocument();
  });
});