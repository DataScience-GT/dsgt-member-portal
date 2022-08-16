import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalForms from './PortalForms';

describe('<PortalForms />', () => {
  test('it should mount', () => {
    render(<PortalForms />);
    
    const portalForms = screen.getByTestId('PortalForms');

    expect(portalForms).toBeInTheDocument();
  });
});