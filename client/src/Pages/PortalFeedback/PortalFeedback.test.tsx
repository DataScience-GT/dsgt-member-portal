import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PortalFeedback from './PortalFeedback';

describe('<PortalFeedback />', () => {
  test('it should mount', () => {
    render(<PortalFeedback />);
    
    const portalFeedback = screen.getByTestId('PortalFeedback');

    expect(portalFeedback).toBeInTheDocument();
  });
});