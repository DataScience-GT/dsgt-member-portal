import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsSidebarSection from './DocsSidebarSection';

describe('<DocsSidebarSection />', () => {
  test('it should mount', () => {
    render(<DocsSidebarSection />);
    
    const docsSidebarSection = screen.getByTestId('DocsSidebarSection');

    expect(docsSidebarSection).toBeInTheDocument();
  });
});