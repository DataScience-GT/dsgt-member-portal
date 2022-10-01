import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeamCard from './TeamCard';

describe('<TeamCard />', () => {
  test('it should mount', () => {
    render(<TeamCard />);
    
    const teamCard = screen.getByTestId('TeamCard');

    expect(teamCard).toBeInTheDocument();
  });
});