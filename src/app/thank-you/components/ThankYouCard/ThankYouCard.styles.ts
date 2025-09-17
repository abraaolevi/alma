import styled from 'styled-components'
import { Button } from '~/components/ui'

export const Card = styled.div`
  background-color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius);
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`

export const IconContainer = styled.div`
  margin-bottom: var(--spacing-lg);
  font-size: 4rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
`

export const Message = styled.p`
  color: var(--color-text-gray);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
`

export const BackButton = styled(Button)`
  background-color: var(--color-black);
  color: var(--color-white);

  &:hover {
    background-color: #333;
  }
`