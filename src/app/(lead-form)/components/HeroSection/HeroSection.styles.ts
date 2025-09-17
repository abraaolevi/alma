import styled from 'styled-components';

export const HeroSection = styled.section`
  height: 367px;
  background: rgb(217, 221, 166);
  background-image: url(/hero-bg.png);
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 210px 367px;
  display: flex;
  flex-direction: column;
  padding-top: 70px;

  @media (max-width: 700px) {
    background-image: none;
    padding: 30px 40px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

export const HeroLogo = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  color: var(--color-black);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroTitle = styled.h2`
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-black);
  margin: 0;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;
