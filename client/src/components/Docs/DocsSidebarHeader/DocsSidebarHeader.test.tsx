import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsSidebarHeader from './DocsSidebarHeader';
import { BrowserRouter } from 'react-router-dom';

describe('<DocsSidebarHeader />', () => {
  test('it should mount', () => {
    render(<DocsSidebarHeader />, { wrapper: BrowserRouter });
    
    const docsSidebarHeader = screen.getByTestId('DocsSidebarHeader');

    expect(docsSidebarHeader).toBeInTheDocument();
  });
});