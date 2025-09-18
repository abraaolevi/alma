import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '~/components/ui/Pagination/Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination with correct page numbers', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders Previous and Next buttons', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText('<');
    expect(prevButton).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);

    const nextButton = screen.getByText('>');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when page number is clicked', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = jest.fn();

    render(<Pagination {...defaultProps} onPageChange={mockOnPageChange} />);

    const pageButton = screen.getByText('3');
    await user.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when Previous button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText('<');
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when Next button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        {...defaultProps}
        currentPage={2}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('>');
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when clicking disabled Previous button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        {...defaultProps}
        currentPage={1}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByText('<');
    await user.click(prevButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when clicking disabled Next button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByText('>');
    await user.click(nextButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('handles large number of pages with ellipsis correctly', () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={jest.fn()} />
    );

    // Should show first page
    expect(screen.getByText('1')).toBeInTheDocument();
    // Should show ellipsis (there are two ellipsis)
    expect(screen.getAllByText('...')).toHaveLength(2);
    // Should show last page
    expect(screen.getByText('20')).toBeInTheDocument();
  });
});
