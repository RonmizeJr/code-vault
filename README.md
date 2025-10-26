# Code Vault - Code Snippet Manager

A modern, full-featured code snippet manager built with Next.js, TypeScript, and Tailwind CSS. Store, organize, and share your code snippets with powerful search, tagging, and collaboration features.

## 🎯 Project Vision

Code Vault aims to be the ultimate code snippet management platform for developers, teams, and organizations. It provides a clean, fast, and intuitive interface for managing code snippets with advanced features like syntax highlighting, version control, sharing, and team collaboration.

## 📋 Feature Roadmap

### Phase 1: Core Foundation (MVP)

- [ ] **User Authentication & Authorization**

  - [x] Sign up/Sign in with email/password
  - [x] OAuth integration (GitHub, Google, Microsoft)
  - [x] User profile management
  - [ ] Password reset functionality

- [ ] **Basic Snippet Management**

  - [ ] Create, read, update, delete snippets
  - [ ] Rich text editor with syntax highlighting
  - [ ] Support for 50+ programming languages
  - [ ] File upload for code files
  - [ ] Copy-to-clipboard functionality

- [ ] **Organization & Search**
  - [ ] Tag system for categorization
  - [ ] Folder/collection organization
  - [ ] Full-text search with filters
  - [ ] Sort by date, popularity, language
  - [ ] Recent snippets dashboard

### Phase 2: Enhanced Features

- [ ] **Advanced Editor**

  - [ ] Monaco Editor integration
  - [ ] Multi-file snippet support
  - [ ] Code formatting and beautification
  - [ ] IntelliSense and autocomplete
  - [ ] Diff viewer for changes

- [ ] **Sharing & Collaboration**

  - [ ] Public/private snippet visibility
  - [ ] Shareable links with expiration
  - [ ] Team workspaces
  - [ ] Comment system on snippets
  - [ ] Fork and merge capabilities

- [ ] **Import/Export**
  - [ ] Import from GitHub Gists
  - [ ] Import from other snippet managers
  - [ ] Export to various formats (JSON, ZIP)
  - [ ] Bulk operations

### Phase 3: Advanced Features

- [ ] **AI-Powered Features**

  - [ ] AI code suggestions and completions
  - [ ] Automatic tag generation
  - [ ] Code explanation and documentation
  - [ ] Similar snippet recommendations

- [ ] **Analytics & Insights**

  - [ ] Usage statistics and analytics
  - [ ] Popular snippets tracking
  - [ ] Team activity dashboard
  - [ ] Code quality metrics

- [ ] **Integrations**
  - [ ] VS Code extension
  - [ ] Browser extension
  - [ ] API for third-party integrations
  - [ ] Webhook support

## 🏗️ Technical Architecture

### Frontend Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with shadcn/ui
- **State Management**: Zustand or Redux Toolkit
- **Forms**: React Hook Form with Zod validation
- **Editor**: Monaco Editor or CodeMirror

### Backend & Database

- **Backend**: Convex (Real-time database and backend functions)
- **Authentication**: Clerk (User management and authentication)
- **File Storage**: Convex File Storage or Vercel Blob
- **Search**: Convex Full-Text Search or Algolia
- **Real-time**: Built-in Convex real-time subscriptions

### Infrastructure

- **Hosting**: Vercel (Frontend) + Convex (Backend)
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics + Sentry
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Main application routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── editor/           # Code editor components
│   └── layout/           # Layout components
├── convex/               # Convex backend functions
│   ├── snippets.ts       # Snippet CRUD operations
│   ├── tags.ts          # Tag management
│   └── collections.ts    # Collection operations
├── lib/                  # Utility functions
│   ├── convex.ts        # Convex client setup
│   └── utils.ts         # Helper functions
├── hooks/                # Custom React hooks
├── store/               # State management
├── types/               # TypeScript type definitions
└── styles/              # Additional styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Convex account (free tier available)
- Clerk account (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd code-vault
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Convex**

   ```bash
   pnpm convex dev
   # Follow the setup instructions to create a new Convex project
   ```

4. **Set up Clerk**

   ```bash
   # Create a new Clerk application at https://clerk.com
   # Copy your Clerk keys to .env.local
   ```

5. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Add your Convex and Clerk keys to .env.local
   ```

6. **Start the development server**

   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm start           # Start production server

# Code Quality
pnpm lint            # Run Biome linter
pnpm format          # Format code with Biome
pnpm type-check      # Run TypeScript type checking

# Convex
pnpm convex dev      # Start Convex development server
pnpm convex deploy   # Deploy Convex functions to production
pnpm convex dashboard # Open Convex dashboard
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale (#F9FAFB to #111827)

### Typography

- **Headings**: Geist Sans
- **Body**: Geist Sans
- **Code**: Geist Mono

### Components

- Consistent spacing system (4px base unit)
- Accessible color contrast ratios
- Mobile-first responsive design
- Dark/light theme support

## 📊 Convex Schema

### Core Tables

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  snippets: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    content: v.string(),
    language: v.string(),
    isPublic: v.boolean(),
    userId: v.id('users'),
    tags: v.array(v.id('tags')),
    collectionId: v.optional(v.id('collections')),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_public', ['isPublic'])
    .index('by_language', ['language'])
    .searchIndex('search_snippets', {
      searchField: 'title',
      filterFields: ['userId', 'isPublic', 'language'],
    }),

  tags: defineTable({
    name: v.string(),
    color: v.string(),
    userId: v.id('users'),
    createdAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_name', ['name']),

  collections: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    userId: v.id('users'),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_public', ['isPublic']),
});
```

### User Management

- **Users**: Managed by Clerk (no custom user table needed)
- **Authentication**: Handled entirely by Clerk
- **User ID**: Retrieved from Clerk's `auth().userId`

## 🚀 Why Convex + Clerk?

### Convex Benefits

- **Real-time by default**: Automatic subscriptions and live updates
- **Type-safe**: Full TypeScript support with generated types
- **No API routes needed**: Direct function calls from frontend
- **Built-in authorization**: User context in every function
- **Automatic scaling**: Handles traffic spikes seamlessly
- **File storage**: Built-in file upload and management
- **Search**: Full-text search with filters

### Clerk Benefits

- **Complete auth solution**: Sign-up, sign-in, password reset, OAuth
- **User management**: Profiles, organizations, roles
- **Security**: Industry-standard security practices
- **Customizable UI**: Pre-built components or custom styling
- **Multi-factor auth**: Built-in 2FA support
- **Social logins**: GitHub, Google, Microsoft, etc.

## 🔒 Security Considerations

- **Authentication**: Clerk handles all authentication securely
- **Authorization**: Convex built-in authorization with user context
- **Data Validation**: Convex schema validation and TypeScript types
- **Rate Limiting**: Built-in Convex rate limiting
- **Content Security**: XSS protection and sanitization
- **Privacy**: GDPR compliance with Clerk and Convex
- **Real-time Security**: Convex subscriptions with user-based filtering

## 🚀 Deployment

### Production Environment

- **Frontend**: Vercel (automatic deployments from main branch)
- **Backend**: Convex (managed backend with automatic scaling)
- **Authentication**: Clerk (managed authentication service)
- **File Storage**: Convex File Storage or Vercel Blob
- **Monitoring**: Vercel Analytics + Sentry

### Environment Variables

```bash
# Convex
CONVEX_DEPLOYMENT="your-convex-deployment-url"
NEXT_PUBLIC_CONVEX_URL="your-convex-url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# File Storage (Optional)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools
