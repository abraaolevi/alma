import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select Component', () => {
  it('renders select with options correctly', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Check if all options are rendered
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('renders with custom id when provided', () => {
    render(<Select id="custom-select" options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'custom-select');
  });

  it('generates unique id when no id is provided', () => {
    render(<Select options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id');
  });

  it('renders with placeholder when provided', () => {
    render(<Select options={mockOptions} placeholder="Choose an option" />);

    const placeholderOption = screen.getByText('Choose an option');
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute('disabled');
    expect(placeholderOption).toHaveAttribute('value', '');
  });

  it('handles value changes correctly', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Select options={mockOptions} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
