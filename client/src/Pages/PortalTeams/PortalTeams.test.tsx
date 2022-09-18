import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalTeams from './PortalTeams';

describe('<PortalTeams />', () => {
  test('it should mount', () => {
    render(<PortalTeams />);
    
    const portalTeams = screen.getByTestId('PortalTeams');

    expect(portalTeams).toBeInTheDocument();
  });
});