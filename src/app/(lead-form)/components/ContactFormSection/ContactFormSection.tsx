import Image from 'next/image';
import { LeadSubmissionForm } from '../LeadSubmissionForm';
import {
  FormDescription,
  FormHeader,
  FormSection,
  FormTitle,
} from './ContactFormSection.styles';

export function ContactFormSection() {
  return (
    <FormSection>
      <FormHeader>
        <Image src="/info.png" alt="Form Illustration" width={44} height={55} />
        <FormTitle>Want to understand your visa options?</FormTitle>
        <FormDescription>
          Submit the form below and our team of experienced attorneys will
          <br />
          review your information and send a preliminary assessment of your
          <br />
          case based on your goals.
        </FormDescription>
      </FormHeader>

      <LeadSubmissionForm />
    </FormSection>
  );
}
