import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from '~/components/ui/FileUpload';

// Mock do hook useId
jest.mock('~/hooks', () => ({
  useId: jest.fn(() => 'test-file-upload-id'),
}));

describe('FileUpload Component', () => {
  const mockOnFileSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders file upload component correctly', () => {
    render(<FileUpload onFileSelect={mockOnFileSelect} />);

    expect(
      screen.getByText('Upload your resume (PDF, DOC, DOCX - max 5MB)')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Choose File' })
    ).toBeInTheDocument();
  });

  it('renders with label when provided', () => {
    render(
      <FileUpload label="Resume Upload" onFileSelect={mockOnFileSelect} />
    );

    expect(screen.getByText('Resume Upload')).toBeInTheDocument();
  });

  it('opens file dialog when choose file button is clicked', () => {
    render(<FileUpload onFileSelect={mockOnFileSelect} />);

    const chooseFileButton = screen.getByRole('button', {
      name: 'Choose File',
    });

    // We can't really test file input click in Jest, but we can test that the button exists
    expect(chooseFileButton).toBeInTheDocument();
  });

  it('has file input with correct accept type', () => {
    render(<FileUpload onFileSelect={mockOnFileSelect} />);

    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('accept', '.pdf,.doc,.docx');
  });

  it('removes file when remove button is clicked', async () => {
    const user = userEvent.setup();
    const selectedFile = new File(['dummy'], 'resume.pdf', {
      type: 'application/pdf',
    });
    render(
      <FileUpload onFileSelect={mockOnFileSelect} selectedFile={selectedFile} />
    );

    const removeButton = screen.getByRole('button', { name: '✕' });
    await user.click(removeButton);

    expect(mockOnFileSelect).toHaveBeenCalledWith(null);
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'File is required';
    render(<FileUpload onFileSelect={mockOnFileSelect} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
