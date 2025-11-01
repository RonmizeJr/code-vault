import Link from 'next/link';
import { SignedOut, SignUpButton, SignInButton, SignedIn } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { Code2 } from 'lucide-react';

export default function Header() {
  return (
    <nav className='fixed z-10 w-full h-16 bg-background/80 backdrop-blur-sm p-4 border-b border-border'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          href='/'
          className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
        >
          <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <Code2 className='w-5 h-5 dark:text-foreground' />
          </div>
          <span className='text-lg font-bold text-foreground'>CodeVault</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <SignedOut>
            <div className='flex items-center space-x-2'>
              <Link
                href='#features'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Features
              </Link>
              <Link
                href='#pricing'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                Pricing
              </Link>
              <SignInButton>
                <Button asChild size='sm'>
                  <Link href='/sign-in'>Sign In</Link>
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button asChild size='sm'>
                  <Link href='/sign-up'>Sign Up</Link>
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <Button asChild size='sm'>
              <Link href='/dashboard'>Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
