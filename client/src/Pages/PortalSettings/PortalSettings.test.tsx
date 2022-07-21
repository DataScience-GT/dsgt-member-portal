import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalSettings from './PortalSettings';

describe('<PortalSettings />', () => {
  test('it should mount', () => {
    render(<PortalSettings />);
    
    const portalSettings = screen.getByTestId('PortalSettings');

    expect(portalSettings).toBeInTheDocument();
  });
});