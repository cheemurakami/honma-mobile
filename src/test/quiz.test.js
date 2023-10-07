import { render, screen } from '@testing-library/react';
import React from 'react';
import { Alert } from 'react-native';
import Quiz from '../components/Quiz.js';

describe('Quiz tests', () => {
  
  it('should contains the heading 1', () => {
    jest.spyOn(Alert, 'alert')
  render(<Quiz />);
      const heading = screen.getByText(/Please write this in /i);
      expect(heading).toBeInTheDocument()
  });
});