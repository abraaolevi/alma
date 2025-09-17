'use client';

import { useState } from 'react';

import { DashboardHeader, LeadsTable, SearchAndFilter } from './components';
import { DashboardContainer } from './dashboard.styles';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  return (
    <DashboardContainer>
      <DashboardHeader />
      <SearchAndFilter onSearchChange={setSearch} onStatusChange={setStatus} />
      <LeadsTable search={search} status={status} />
    </DashboardContainer>
  );
}
