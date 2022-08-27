import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackButton from './FeedbackButton';

describe('<FeedbackButton />', () => {
  test('it should mount', () => {
    render(<FeedbackButton />);
    
    const feedbackButton = screen.getByTestId('FeedbackButton');

    expect(feedbackButton).toBeInTheDocument();
  });
});