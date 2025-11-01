// app/dashboard/page.tsx
'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Code2, Tag, Calendar } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { SearchForm } from '@/components/search-form';

export default function DashboardPage() {
  const { user } = useUser();
  // Fetch all snippets for the current user
  const snippets = useQuery(api.snippets.getMySnippets);

  const totalSnippets = snippets?.length ?? 0;
  const recentSnippets =
    snippets?.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5) ?? [];

  const languages =
    snippets?.reduce((acc, snippet) => {
      acc[snippet.language] = (acc[snippet.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) ?? {};

  const topLanguage = Object.entries(languages).sort(
    ([, a], [, b]) => b - a
  )[0];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='flex flex-col gap-8'>
      {/* --- Header --- */}
      <div className='flex items-center justify-between mt-16 p-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground mt-1 font-semibold'>
            Welcome back {user?.firstName}! Here's your snippet library.
          </p>
        </div>
        <Button asChild>
          <Link href='/dashboard/snippets/create'>
            <Plus className='mr-2 h-4 w-4' />
            New Snippet
          </Link>
        </Button>
      </div>

      {/* --- Stats Grid --- */}
      <div className='grid gap-4 md:grid-cols-3 p-8'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Snippets
            </CardTitle>
            <Code2 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalSnippets}</div>
            <p className='text-xs text-muted-foreground'>snippets saved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Top Language</CardTitle>
            <Tag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold capitalize'>
              {topLanguage?.[0] ?? 'N/A'}
            </div>
            <p className='text-xs text-muted-foreground'>
              {topLanguage?.[1] ?? 0} snippets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Last Modified</CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {recentSnippets.length > 0
                ? formatDate(recentSnippets[0].updatedAt)
                : 'Never'}
            </div>
            <p className='text-xs text-muted-foreground'>
              most recently updated
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Recent Snippets Table --- */}
      <Card className='p-8'>
        <CardHeader>
          <CardTitle>Recent Snippets</CardTitle>
          <CardDescription>
            Your {recentSnippets.length} most recently created snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentSnippets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSnippets.map((snippet) => (
                  <TableRow key={snippet._id}>
                    <TableCell className='font-medium'>
                      {snippet.title}
                    </TableCell>
                    <TableCell>
                      <span className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 capitalize'>
                        {snippet.language}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {snippet.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className='inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'
                          >
                            {tag}
                          </span>
                        ))}
                        {snippet.tags.length > 2 && (
                          <span className='inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700'>
                            +{snippet.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='text-sm text-muted-foreground'>
                      {formatDate(snippet.createdAt)}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Link href={`/dashboard/snippets/${snippet._id}`}>
                        <Button variant='ghost' size='sm'>
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className='flex flex-col items-center justify-center py-12'>
              <Code2 className='h-12 w-12 text-muted-foreground mb-4 opacity-50' />
              <p className='text-muted-foreground mb-4 text-center'>
                No snippets yet. Create your first one to get started!
              </p>
              <Button asChild>
                <Link href='/dashboard/snippets/create'>
                  <Plus className='mr-2 h-4 w-4' />
                  Create Snippet
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
