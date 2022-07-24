import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResetPassword from './ResetPassword';

describe('<ResetPassword />', () => {
  test('it should mount', () => {
    render(<ResetPassword />);
    
    const resetPassword = screen.getByTestId('ResetPassword');

    expect(resetPassword).toBeInTheDocument();
  });
});