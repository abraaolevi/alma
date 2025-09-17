'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Input, Select } from '~/components';
import {
  SearchFilterContainer,
  SearchInputFilterContainer,
  SearchInputImageContainer,
} from './SearchAndFilter.styles';

interface SearchAndFilterProps {
  onSearchChange?: (search: string) => void;
  onStatusChange?: (status: string) => void;
}

export function SearchAndFilter({
  onSearchChange,
  onStatusChange,
}: SearchAndFilterProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange?.(value);
  };

  return (
    <SearchFilterContainer>
      <SearchInputFilterContainer>
        <SearchInputImageContainer
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Image src="/search-icon.png" alt="Search" width={20} height={20} />
        </SearchInputImageContainer>
        <Input
          ref={inputRef}
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{ paddingLeft: '40px', width: '250px' }}
        />
      </SearchInputFilterContainer>

      <Select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        options={[
          { value: '', label: 'All Status' },
          { value: 'PENDING', label: 'Pending' },
          { value: 'REACHED_OUT', label: 'Reached Out' },
        ]}
        placeholder="Status"
      />
    </SearchFilterContainer>
  );
}
