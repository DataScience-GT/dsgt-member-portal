import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalMembers from './PortalMembers';

describe('<PortalMembers />', () => {
  test('it should mount', () => {
    render(<PortalMembers />);
    
    const portalMembers = screen.getByTestId('PortalMembers');

    expect(portalMembers).toBeInTheDocument();
  });
});