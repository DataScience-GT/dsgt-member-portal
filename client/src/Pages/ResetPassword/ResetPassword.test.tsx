import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResetPassword from './ResetPassword';
import { BrowserRouter } from 'react-router-dom';

describe('<ResetPassword />', () => {
  test('it should mount', () => {
    render(<ResetPassword />, { wrapper: BrowserRouter });
    
    const resetPassword = screen.getByTestId('ResetPassword');

    expect(resetPassword).toBeInTheDocument();
  });
});