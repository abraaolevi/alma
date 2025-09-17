import {
  BackButton,
  Card,
  IconContainer,
  Message,
  Title,
} from './ThankYouCard.styles';

interface ThankYouCardProps {
  onGoBack?: () => void;
}

export function ThankYouCard({ onGoBack }: ThankYouCardProps) {
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Card>
      <IconContainer>📄</IconContainer>
      <Title>Thank You</Title>
      <Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai.
      </Message>
      <BackButton onClick={handleGoBack}>Go Back to Homepage</BackButton>
    </Card>
  );
}
