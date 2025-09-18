'use client';

import { useEffect, useState } from 'react';
import { Button, Pagination } from '~/components';
import { useLeads } from '~/hooks';
import { type LeadResponse } from '~/schemas';
import {
  EmptyContainer,
  ErrorContainer,
  LoadingContainer,
  SortIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from './LeadsTable.styles';

interface LeadsTableProps {
  search?: string;
  status?: string;
}

type SortField = 'name' | 'createdAt' | 'status' | 'country';
type SortDirection = 'asc' | 'desc';

export function LeadsTable({ search, status }: LeadsTableProps) {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { leads, pagination, isLoading, error, updateLeadStatus } = useLeads({
    search,
    status,
    page: currentPage,
    limit,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusClick = async (lead: LeadResponse) => {
    const newStatus = lead.status === 'PENDING' ? 'REACHED_OUT' : 'PENDING';
    await updateLeadStatus(lead.id, newStatus);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(date));
  };

  const getFullName = (lead: LeadResponse) => {
    return `${lead.firstName} ${lead.lastName}`;
  };

  // Sort leads
  const sortedLeads = [...leads].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'name':
        aValue = getFullName(a).toLowerCase();
        bValue = getFullName(b).toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'country':
        aValue = a.country.toLowerCase();
        bValue = b.country.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  if (isLoading) {
    return (
      <TableContainer>
        <LoadingContainer>Loading leads...</LoadingContainer>
      </TableContainer>
    );
  }

  if (error) {
    return <ErrorContainer>Error loading leads: {error}</ErrorContainer>;
  }

  if (leads.length === 0) {
    return (
      <TableContainer>
        <EmptyContainer>
          <div>No leads found</div>
          <div>Try adjusting your search or filter criteria</div>
        </EmptyContainer>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell $sortable onClick={() => handleSort('name')}>
              Name
              <SortIcon>{getSortIcon('name')}</SortIcon>
            </TableHeaderCell>
            <TableHeaderCell $sortable onClick={() => handleSort('createdAt')}>
              Submitted
              <SortIcon>{getSortIcon('createdAt')}</SortIcon>
            </TableHeaderCell>
            <TableHeaderCell $sortable onClick={() => handleSort('status')}>
              Status
              <SortIcon>{getSortIcon('status')}</SortIcon>
            </TableHeaderCell>
            <TableHeaderCell $sortable onClick={() => handleSort('country')}>
              Country
              <SortIcon>{getSortIcon('country')}</SortIcon>
            </TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {sortedLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{getFullName(lead)}</TableCell>
              <TableCell>{formatDate(lead.createdAt)}</TableCell>
              <TableCell>
                {lead.status === 'PENDING' ? 'Pending' : 'Reached Out'}
              </TableCell>
              <TableCell>{lead.country}</TableCell>
              <TableCell>
                <Button onClick={() => void handleStatusClick(lead)}>
                  Change status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
