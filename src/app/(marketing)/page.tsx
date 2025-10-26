import Image from 'next/image';
import Link from 'next/link';

// Shadcn UI Components
import { Button } from '@/components/ui/button'; // Assuming you added Button
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Assuming you added Card
// You might add an Alert Dialog for a "View Demo" if it's a modal
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background text-foreground font-sans'>
      <section className='relative flex items-center justify-center min-h-screen pt-20 bg-gradient-to-br from-background to-indigo-950 overflow-hidden'>
        {/* Background blobs/shapes (keeping as is, they don't conflict) */}
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute top-1/2 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-1/4 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
          <h1 className='text-5xl md:text-6xl font-extrabold leading-tight dark:text-white mb-6 animate-fade-in-up'>
            Stop Rewriting, Start Reusing.
          </h1>
          <p className='text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-in-up animation-delay-500'>
            CodeVault is the collaborative code snippet manager that organizes
            your team&apos;s reusable code, making it instantly discoverable and
            always in sync.
          </p>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animation-delay-1000'>
            <Button
              asChild
              size='lg'
              className='shadow-lg transform hover:scale-105 transition-all duration-300'
            >
              <Link href='/sign-up'>Get Started Free</Link>
            </Button>
            {/* If "View Demo" is a modal */}
            {/* <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="lg" className="shadow-lg transform hover:scale-105 transition-all duration-300">
                    View Demo (Soon!)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Demo Coming Soon!</AlertDialogTitle>
                    <AlertDialogDescription>
                      We're putting the finishing touches on our interactive demo.
                      Sign up now to be notified when it's live!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Link href="/sign-up">Sign Up Now</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}
            {/* Else, just a regular button */}
            <Button
              asChild
              variant='outline'
              size='lg'
              className='shadow-lg transform hover:scale-105 transition-all duration-300'
            >
              <Link href='#demo'>View Demo (Soon!)</Link>
            </Button>
          </div>
          <div className='mt-16 w-full max-w-5xl mx-auto p-4 bg-card rounded-lg shadow-2xl border border-primary/50'>
            <Image
              src='/path/to/hero-screenshot.png'
              alt='CodeVault Dashboard Screenshot'
              width={1200}
              height={700}
              layout='responsive'
              className='rounded-md border border-border' // Added border for crispness
            />
          </div>
        </div>
      </section>

      {/* --- Problem/Pain Point Section --- */}
      <section className='py-20 bg-muted/20' id='problem'>
        <div className='container mx-auto px-6 text-center max-w-3xl'>
          <h2 className='text-4xl font-bold text-foreground mb-6'>
            The Problem We All Face.
          </h2>
          <p className='text-xl text-muted-foreground leading-relaxed mb-8'>
            How many times have you searched through old projects, Slack, or
            random gists for that one helper function?
          </p>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Teams constantly duplicate effort, waste time, and lose
            institutional knowledge due to scattered code snippets. Existing
            solutions are clunky, personal, or lack real-time collaboration.
          </p>
        </div>
      </section>

      {/* --- Solution/Features Section --- */}
      <section className='py-20 bg-background' id='features'>
        <div className='container mx-auto px-6'>
          <h2 className='text-4xl font-bold text-foreground text-center mb-16'>
            CodeVault: Your Team&apos;s Shared Brain.
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Feature Block 1 with Shadcn Card */}
            <Card className='hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  Intuitive Organization
                </CardTitle>
                <CardDescription>
                  Create, tag, and categorize snippets effortlessly. Add
                  detailed descriptions and context so everyone understands how
                  and when to use them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-border'>
                  <span className='text-sm'>
                    Screenshot: Create Snippet Form
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Feature Block 2 with Shadcn Card */}
            <Card className='hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  Lightning-Fast Search
                </CardTitle>
                <CardDescription>
                  Our powerful full-text and tag-based search helps you find the
                  exact code you need in seconds, not minutes. Stop digging,
                  start coding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-border'>
                  <span className='text-sm'>Screenshot: Search Results</span>
                </div>
              </CardContent>
            </Card>

            {/* Feature Block 3 with Shadcn Card (Hinting at Future) */}
            <Card className='hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  Real-time Collaboration
                </CardTitle>
                <CardDescription>
                  Share your snippets securely with your team. Get real-time
                  feedback and updates, ensuring everyone&apos;s always on the
                  same page. (Powered by Convex!)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-border'>
                  <span className='text-sm'>
                    Screenshot: Team view / Comments
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Feature Block 4 with Shadcn Card */}
            <Card className='hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  Beautifully Rendered
                </CardTitle>
                <CardDescription>
                  Enjoy beautifully syntax-highlighted code in your preferred
                  language, making snippets easy to read and understand at a
                  glance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='w-full h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground border border-border'>
                  <span className='text-sm'>
                    Screenshot: Code with Syntax Highlighting
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section className='py-20 bg-muted/20' id='how-it-works'>
        <div className='container mx-auto px-6 text-center max-w-4xl'>
          <h2 className='text-4xl font-bold text-foreground mb-12'>
            Get Started in 3 Simple Steps.
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Step 1 with Shadcn Card */}
            <Card className='p-6'>
              <CardTitle className='text-5xl text-primary mb-4'>1.</CardTitle>
              <CardDescription className='text-xl font-semibold text-foreground mb-2'>
                Create an Account
              </CardDescription>
              <p className='text-muted-foreground'>
                Quickly sign up using your email or social accounts via Clerk.
              </p>
            </Card>
            {/* Step 2 with Shadcn Card */}
            <Card className='p-6'>
              <CardTitle className='text-5xl text-primary mb-4'>2.</CardTitle>
              <CardDescription className='text-xl font-semibold text-foreground mb-2'>
                Add Your First Snippet
              </CardDescription>
              <p className='text-muted-foreground'>
                Paste your code, add a title, tags, and a description.
              </p>
            </Card>
            {/* Step 3 with Shadcn Card */}
            <Card className='p-6'>
              <CardTitle className='text-5xl text-primary mb-4'>3.</CardTitle>
              <CardDescription className='text-xl font-semibold text-foreground mb-2'>
                Share & Discover
              </CardDescription>
              <p className='text-muted-foreground'>
                Share with your team or search your growing personal library.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* --- Call to Action Section (Bottom) --- */}
      <section className='py-20 bg-gradient-to-tr from-background to-indigo-950 text-center'>
        <div className='container mx-auto px-6'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-8'>
            Ready to Elevate Your Team&apos;s Efficiency?
          </h2>
          <div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <Button
              asChild
              size='lg'
              className='px-10 py-5 text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'
            >
              <Link href='/sign-up'>Start Your Free Trial Today</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='px-10 py-5 text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'
            >
              <Link href='#pricing'>Learn More About Our Team Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
