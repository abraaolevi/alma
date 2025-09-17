import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 280px;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl);
  border-right: 1px solid rgba(26, 26, 26, 0.1);

  @media (max-width: 768px) {
    width: 200px;
    padding: var(--spacing-lg);
  }

  @media (max-width: 640px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }
`;

export const SidebarHeader = styled.div`
  margin-bottom: var(--spacing-xl);
`;

export const Logo = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--color-black);
  margin: 0;
  letter-spacing: -0.02em;
`;

export const Navigation = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  color: var(--color-black);
  text-decoration: none;
  font-weight: 400;
  font-size: 1.125rem;
  cursor: pointer;

  ${(props) =>
    props.$active &&
    `
    font-weight: 700 !important;
  `}

  &:hover {
    font-weight: 500;
  }
`;

export const SidebarFooter = styled.div`
  position: fixed;
  bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

export const Avatar = styled.div`
  width: 52px;
  height: 52px;
  background-color: #e7e7e7;
  color: var(--color-black);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
`;

export const AdminLabel = styled.span`
  font-weight: 800;
  font-size: 20px;
  color: var(--color-black);
`;
