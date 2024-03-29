import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalEvent from './PortalEvent';

describe('<PortalEvent />', () => {
  test('it should mount', () => {
    render(<PortalEvent />);
    
    const portalEvent = screen.getByTestId('PortalEvent');

    expect(portalEvent).toBeInTheDocument();
  });
});