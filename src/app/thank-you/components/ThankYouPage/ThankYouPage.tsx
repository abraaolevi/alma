'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BackButton } from '../ThankYouCard/ThankYouCard.styles';
import { Container, Message, Title } from './ThankYouPage.styles';

export function ThankYouPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <Container>
      <Image src="/info.png" alt="Form Illustration" width={44} height={55} />
      <Title>Thank You</Title>
      <Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </Message>
      <BackButton style={{ width: '300px' }} onClick={handleGoBack}>
        Go Back to Homepage
      </BackButton>
    </Container>
  );
}
