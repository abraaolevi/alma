import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '~/components/ui/Input';

// Mock do hook useId
jest.mock('~/hooks', () => ({
  useId: jest.fn(() => 'test-input-id'),
}));

describe('Input Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field correctly', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    // HTML inputs have a default type of 'text', but it might not be explicitly set
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('renders with custom id when provided', () => {
    render(<Input id="custom-id" placeholder="Test input" />);

    const input = screen.getByPlaceholderText('Test input');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} placeholder="Test input" />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'Hello World');

    expect(input).toHaveValue('Hello World');
    expect(handleChange).toHaveBeenCalled();
  });
});
