'use client';

import { ContactFormSection, HeroSection } from '../';
import { PageContainer } from './LeadFormPage.styles';

export function LeadFormPage() {
  return (
    <PageContainer>
      <HeroSection />
      <ContactFormSection />
    </PageContainer>
  );
}
