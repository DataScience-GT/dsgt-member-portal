import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MemberActionMenu from './MemberActionMenu';

describe('<MemberActionMenu />', () => {
  test('it should mount', () => {
    render(<MemberActionMenu />);
    
    const memberActionMenu = screen.getByTestId('MemberActionMenu');

    expect(memberActionMenu).toBeInTheDocument();
  });
});