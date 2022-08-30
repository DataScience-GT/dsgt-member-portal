import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalCheckin from './PortalCheckin';

describe('<PortalCheckin />', () => {
  test('it should mount', () => {
    render(<PortalCheckin />);
    
    const portalCheckin = screen.getByTestId('PortalCheckin');

    expect(portalCheckin).toBeInTheDocument();
  });
});