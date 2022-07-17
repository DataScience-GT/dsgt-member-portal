import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RequestLink from './RequestLink';

describe('<RequestLink />', () => {
  test('it should mount', () => {
    render(<RequestLink />);
    
    const requestLink = screen.getByTestId('RequestLink');

    expect(requestLink).toBeInTheDocument();
  });
});