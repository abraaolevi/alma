import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '~/components/ui/Checkbox';

// Mock do hook useId
jest.mock('~/hooks', () => ({
  useId: jest.fn(() => 'test-checkbox-id'),
}));

describe('Checkbox Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with label correctly', () => {
    render(<Checkbox label="Accept terms" readOnly />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders with custom id when provided', () => {
    render(<Checkbox id="custom-checkbox" label="Custom checkbox" readOnly />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'custom-checkbox');
  });

  it('renders checked state correctly', () => {
    render(<Checkbox label="Checked box" checked={true} readOnly />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles user click correctly', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Checkbox label="Click me" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(
      <Checkbox label="Required checkbox" error={errorMessage} readOnly />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('can be clicked via label', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Checkbox label="Click label" onChange={handleChange} />);

    const label = screen.getByText('Click label');
    await user.click(label);

    expect(handleChange).toHaveBeenCalled();
  });
});
