import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DocsSidebarItem from './DocsSidebarItem';

describe('<DocsSidebarItem />', () => {
  test('it should mount', () => {
    render(<DocsSidebarItem />);
    
    const docsSidebarItem = screen.getByTestId('DocsSidebarItem');

    expect(docsSidebarItem).toBeInTheDocument();
  });
});