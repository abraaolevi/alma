'use client';

import { useForm } from 'react-hook-form';
import { Button, Input } from '~/components';
import { useAuth } from '~/hooks';
import {
  ErrorMessage,
  LoginCard,
  LoginContainer,
  LoginForm as StyledLoginForm,
  LoginHeader,
  LoginSubtitle,
  LoginTitle,
} from './LoginForm.styles';

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>Admin Login</LoginTitle>
          <LoginSubtitle>
            Enter your credentials to access the admin dashboard
          </LoginSubtitle>
        </LoginHeader>

        <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            label="Username"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
            })}
            error={errors.username?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-white)',
              opacity: isLoading ? 0.7 : 1,
              marginTop: 'var(--spacing-sm)',
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </StyledLoginForm>
      </LoginCard>
    </LoginContainer>
  );
}