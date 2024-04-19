
import '../styles/App.css';

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';

describe('Quiz component', () => {
  it('should display the correct score if the first question\'s answer is incorrect', async () => {
    const { getByText, getByLabelText } = render(<Quiz />);
    
    // Incorrect answer for the first question
    fireEvent.change(getByLabelText('Answer'), { target: { value: 'wrong' } });
    fireEvent.click(getByText('Submit'));

    // Ensure the attempt alert is displayed
    await waitFor(() => expect(getByText('Incorrect. Two attempts remaining.')).toBeInTheDocument());

    // Ensure the score remains 0
    expect(getByText('Your score: 0/5')).toBeInTheDocument();
  });

  it('should display the correct score if the second question\'s answer is incorrect', async () => {
    const { getByText, getByLabelText } = render(<Quiz />);
    
    // Correct answer for the first question
    fireEvent.change(getByLabelText('Answer'), { target: { value: 'paris' } });
    fireEvent.click(getByText('Submit'));

    // Incorrect answer for the second question
    fireEvent.change(getByLabelText('Answer'), { target: { value: 'wrong' } });
    fireEvent.click(getByText('Submit'));

    // Ensure the attempt alert is displayed
    await waitFor(() => expect(getByText('Incorrect. Two attempts remaining.')).toBeInTheDocument());

    // Ensure the score remains 1
    expect(getByText('Your score: 1/5')).toBeInTheDocument();
  });

  // Repeat similar test cases for other scenarios...
});

