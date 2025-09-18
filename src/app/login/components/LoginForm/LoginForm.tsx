'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button, ErrorMessage, Input } from '~/components';
import { useAuth } from '~/contexts';
import {
  LoginCard,
  LoginContainer,
  LoginHeader,
  LoginSubtitle,
  LoginTitle,
  LoginForm as StyledLoginForm,
} from './LoginForm.styles';

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data.username, data.password);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError('root', {
        type: 'manual',
        message: result.error ?? 'Login failed',
      });
    }
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
          {errors.root && <ErrorMessage>{errors.root.message}</ErrorMessage>}

          <Input
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
            })}
            error={errors.username?.message}
          />

          <Input
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
