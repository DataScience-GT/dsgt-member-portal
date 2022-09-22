import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsSidebarSection from './DocsSidebarSection';
import { BrowserRouter } from 'react-router-dom';

describe('<DocsSidebarSection />', () => {
  test('it should mount', () => {
    render(<DocsSidebarSection />, { wrapper: BrowserRouter });
    
    const docsSidebarSection = screen.getByTestId('DocsSidebarSection');

    expect(docsSidebarSection).toBeInTheDocument();
  });
});