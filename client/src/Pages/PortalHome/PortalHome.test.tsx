import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalHome from './PortalHome';

describe('<PortalHome />', () => {
  test('it should mount', () => {
    render(<PortalHome />);
    
    const portalHome = screen.getByTestId('PortalHome');

    expect(portalHome).toBeInTheDocument();
  });
});