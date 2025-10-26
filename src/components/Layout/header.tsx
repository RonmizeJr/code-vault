import Link from 'next/link';
import {
  SignedOut,
  SignUpButton,
  SignInButton,
  UserButton,
  SignedIn,
} from '@clerk/nextjs';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <nav className='fixed w-full z-10 bg-background/80 backdrop-blur-sm p-4 border-b border-border'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold text-primary hover:text-primary/80 transition-colors'
        >
          CodeVault
        </Link>
        <div className='flex items-center space-x-4'>
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
          <SignedOut>
            <div className='flex items-center space-x-2'>
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
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
