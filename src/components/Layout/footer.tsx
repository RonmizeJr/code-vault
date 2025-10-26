import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-card py-10 border-t border-border'>
      <div className='container mx-auto px-6 text-center text-muted-foreground'>
        <Link
          href='/'
          className='text-2xl font-bold text-primary hover:text-primary/80 transition-colors block mb-4'
        >
          CodeVault
        </Link>
        <div className='flex justify-center space-x-6 mb-6'>
          <Link
            href='#features'
            className='hover:text-foreground transition-colors'
          >
            Features
          </Link>
          <Link
            href='#pricing'
            className='hover:text-foreground transition-colors'
          >
            Pricing
          </Link>
          <Link
            href='/blog'
            className='hover:text-foreground transition-colors'
          >
            Blog
          </Link>
          <Link
            href='/terms'
            className='hover:text-foreground transition-colors'
          >
            Terms
          </Link>
          <Link
            href='/privacy'
            className='hover:text-foreground transition-colors'
          >
            Privacy
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} CodeVault. All rights reserved.</p>
      </div>
    </footer>
  );
}
