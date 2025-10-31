// app/dashboard/snippets/create/page.tsx
'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
  'rust',
  'go',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'sql',
  'html',
  'css',
  'jsx',
  'tsx',
  'bash',
  'shell',
  'yaml',
  'json',
  'xml',
];

export default function CreateSnippetPage() {
  const router = useRouter();
  const createSnippet = useMutation(api.snippets.createSnippet);

  // Form state
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to parse tags from comma-separated string
  const parseTags = (input: string) => {
    return input
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  };

  // Validate form
  const isFormValid = title.trim() && code.trim() && language;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const snippetId = await createSnippet({
        title: title.trim(),
        code: code.trim(),
        language,
        description: description.trim() || undefined,
        tags: parseTags(tagsInput),
      });

      // Redirect to the newly created snippet
      router.push(`/dashboard/snippets/${snippetId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create snippet');
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      {/* --- Header with Back Button --- */}
      <div className='flex items-center gap-4'>
        <Link href='/dashboard'>
          <Button variant='ghost' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Create Snippet</h1>
          <p className='text-muted-foreground mt-1'>
            Add a new code snippet to your library
          </p>
        </div>
      </div>

      {/* --- Form Card --- */}
      <Card>
        <CardHeader>
          <CardTitle>New Code Snippet</CardTitle>
          <CardDescription>Fields marked with * are required</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* --- Error Message --- */}
            {error && (
              <div className='p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm'>
                {error}
              </div>
            )}

            {/* --- Title Field --- */}
            <div className='space-y-2'>
              <Label htmlFor='title' className='text-base font-medium'>
                Title <span className='text-red-500'>*</span>
              </Label>
              <Input
                id='title'
                placeholder='e.g., React useEffect Hook Pattern'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                className='text-base'
              />
              <p className='text-xs text-muted-foreground'>
                Give your snippet a clear, descriptive title
              </p>
            </div>

            {/* --- Language & Description Row --- */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Language Select */}
              <div className='space-y-2'>
                <Label htmlFor='language' className='text-base font-medium'>
                  Language <span className='text-red-500'>*</span>
                </Label>
                <Select
                  value={language}
                  onValueChange={setLanguage}
                  disabled={isLoading}
                >
                  <SelectTrigger id='language' className='text-base'>
                    <SelectValue placeholder='Select a language' />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem
                        key={lang}
                        value={lang}
                        className='capitalize'
                      >
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className='text-xs text-muted-foreground'>
                  Used for syntax highlighting
                </p>
              </div>

              {/* Description Field */}
              <div className='space-y-2'>
                <Label htmlFor='description' className='text-base font-medium'>
                  Description <span className='text-gray-400'>(Optional)</span>
                </Label>
                <Input
                  id='description'
                  placeholder='Brief description of what this snippet does'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                  className='text-base'
                />
                <p className='text-xs text-muted-foreground'>
                  Help others understand this snippet's purpose
                </p>
              </div>
            </div>

            {/* --- Tags Field --- */}
            <div className='space-y-2'>
              <Label htmlFor='tags' className='text-base font-medium'>
                Tags <span className='text-gray-400'>(Optional)</span>
              </Label>
              <Input
                id='tags'
                placeholder='e.g., react, hooks, performance'
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                disabled={isLoading}
                className='text-base'
              />
              <p className='text-xs text-muted-foreground'>
                Separate tags with commas for easy searching and filtering
              </p>
              {tagsInput && (
                <div className='flex flex-wrap gap-2 mt-2'>
                  {parseTags(tagsInput).map((tag) => (
                    <span
                      key={tag}
                      className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* --- Code Editor --- */}
            <div className='space-y-2'>
              <Label htmlFor='code' className='text-base font-medium'>
                Code <span className='text-red-500'>*</span>
              </Label>
              <Textarea
                id='code'
                placeholder='Paste your code here...'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                className='font-mono text-sm min-h-80'
              />
              <div className='flex items-center justify-between'>
                <p className='text-xs text-muted-foreground'>
                  {code.length} characters
                </p>
              </div>
            </div>

            {/* --- Form Actions --- */}
            <div className='flex gap-3 justify-end pt-6 border-t border-border'>
              <Link href='/dashboard'>
                <Button variant='outline' disabled={isLoading}>
                  Cancel
                </Button>
              </Link>
              <Button
                type='submit'
                disabled={!isFormValid || isLoading}
                size='lg'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Creating...
                  </>
                ) : (
                  'Create Snippet'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* --- Tips Section --- */}
      <Card className='bg-blue-50 border-blue-200'>
        <CardHeader>
          <CardTitle className='text-blue-900'>
            💡 Tips for Great Snippets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-2 text-sm text-blue-800'>
            <li>
              ✨ <strong>Be Descriptive:</strong> Clear titles and descriptions
              help you find snippets faster
            </li>
            <li>
              🏷️ <strong>Use Tags:</strong> Tags make snippets discoverable
              across your team
            </li>
            <li>
              📝 <strong>Clean Code:</strong> Keep snippets focused and reusable
            </li>
            <li>
              💬 <strong>Context:</strong> Include comments in your code
              explaining edge cases
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
