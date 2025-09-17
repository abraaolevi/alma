'use client';
import {
  HeaderContainer,
  PageTitle,
} from '../components/DashboardHeader/DashboardHeader.styles';
import { DashboardContainer } from '../dashboard.styles';

export default function SettingsPage() {
  return (
    <DashboardContainer>
      <HeaderContainer>
        <PageTitle>Settings</PageTitle>
      </HeaderContainer>
      <div>Settings...</div>
    </DashboardContainer>
  );
}
