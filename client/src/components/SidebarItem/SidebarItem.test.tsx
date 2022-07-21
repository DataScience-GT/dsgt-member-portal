import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SidebarItem from './SidebarItem';

describe('<SidebarItem />', () => {
  test('it should mount', () => {
    render(<SidebarItem />);
    
    const sidebarItem = screen.getByTestId('SidebarItem');

    expect(sidebarItem).toBeInTheDocument();
  });
});