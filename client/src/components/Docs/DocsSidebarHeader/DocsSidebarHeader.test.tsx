import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsSidebarHeader from './DocsSidebarHeader';

describe('<DocsSidebarHeader />', () => {
  test('it should mount', () => {
    render(<DocsSidebarHeader />);
    
    const docsSidebarHeader = screen.getByTestId('DocsSidebarHeader');

    expect(docsSidebarHeader).toBeInTheDocument();
  });
});