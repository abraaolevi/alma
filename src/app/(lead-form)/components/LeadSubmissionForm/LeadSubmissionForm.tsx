import Image from 'next/image';
import {
  FormHeader,
  FormTitle,
} from '~/app/(lead-form)/components/ContactFormSection/ContactFormSection.styles';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorMessage,
  FileUpload,
  Input,
  Select,
  TextArea,
} from '~/components';
import { CheckboxGroupErrorMessage } from '~/components/ui/FormElements';
import { useFormValidation, useLeadSubmission } from '~/hooks';
import { StyledForm } from './LeadSubmissionForm.styles';

const countryOptions = [
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Russia', label: 'Russia' },
  { value: 'France', label: 'France' },
  { value: 'Other', label: 'Other' },
];

const visaOptions = ['O-1', 'H-1A', 'EB-2 NIW', "I don't know"];

interface LeadSubmissionFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function LeadSubmissionForm({
  onSuccess,
  className,
}: LeadSubmissionFormProps) {
  const { submitLead, isSubmitting, error } = useLeadSubmission({ onSuccess });

  const {
    registerField,
    handleSubmit,
    handleVisaChange,
    handleFileSelect,
    watchedVisaTypes,
    watchedResume,
    errors,
  } = useFormValidation({
    onSubmit: submitLead,
  });

  console.log({ errors });

  return (
    <StyledForm onSubmit={handleSubmit} className={className}>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Input
        label="First Name"
        placeholder="First Name"
        {...registerField('firstName')}
        error={errors.firstName?.message}
      />

      <Input
        label="Last Name"
        placeholder="Last Name"
        {...registerField('lastName')}
        error={errors.lastName?.message}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Email"
        {...registerField('email')}
        error={errors.email?.message}
      />

      <Select
        label="Country of Citizenship"
        placeholder="Country of Citizenship"
        options={countryOptions}
        {...registerField('country')}
        error={errors.country?.message}
      />

      <Input
        label="LinkedIn / Personal Website URL"
        placeholder="LinkedIn / Personal Website URL"
        {...registerField('websiteUrl')}
        error={errors.websiteUrl?.message}
      />

      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <FormHeader>
          <Image
            src="/dice.png"
            alt="Form Illustration"
            width={54}
            height={48}
          />
          <FormTitle>Visa categories of interest?</FormTitle>
        </FormHeader>
        <CheckboxGroup>
          {visaOptions.map((visa) => (
            <Checkbox
              key={visa}
              label={visa}
              checked={watchedVisaTypes?.includes(visa) || false}
              onChange={(e) => handleVisaChange(visa, e.target.checked)}
            />
          ))}
        </CheckboxGroup>
        {errors.visaTypes && (
          <CheckboxGroupErrorMessage>
            {errors.visaTypes.message}
          </CheckboxGroupErrorMessage>
        )}
      </div>

      <FileUpload
        label="Resume / CV"
        onFileSelect={handleFileSelect}
        selectedFile={watchedResume?.[0] ?? null}
        accept=".pdf,.doc,.docx"
        error={errors.resume?.message}
      />

      <div style={{ marginTop: 'var(--spacing-md)' }}>
        <FormHeader>
          <Image
            src="/heart.png"
            alt="Form Illustration"
            width={53}
            height={45}
          />
          <FormTitle>How can we help you?</FormTitle>
        </FormHeader>
        <TextArea
          placeholder="Tell us your immigration history here. Things like: current status, previous visa applications and outcomes, education, etc."
          rows={6}
          {...registerField('moreInfo')}
          error={errors.moreInfo?.message}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: 'var(--color-black)',
          color: 'var(--color-white)',
          marginTop: 'var(--spacing-md)',
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </StyledForm>
  );
}
