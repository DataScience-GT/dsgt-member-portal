import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalAccount from './PortalAccount';

describe('<PortalAccount />', () => {
  test('it should mount', () => {
    render(<PortalAccount />);
    
    const portalAccount = screen.getByTestId('PortalAccount');

    expect(portalAccount).toBeInTheDocument();
  });
});