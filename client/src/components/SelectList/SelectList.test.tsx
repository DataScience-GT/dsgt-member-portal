import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectList from './SelectList';

describe('<SelectList />', () => {
  test('it should mount', () => {
    render(<SelectList />);
    
    const selectList = screen.getByTestId('SelectList');

    expect(selectList).toBeInTheDocument();
  });
});