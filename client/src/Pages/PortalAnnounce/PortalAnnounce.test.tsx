import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalAnnounce from './PortalAnnounce';

describe('<PortalAnnounce />', () => {
  test('it should mount', () => {
    render(<PortalAnnounce />);
    
    const portalAnnounce = screen.getByTestId('PortalAnnounce');

    expect(portalAnnounce).toBeInTheDocument();
  });
});