# Code Vault - Code Snippet Manager

A modern, full-featured code snippet manager built with Next.js, TypeScript, and Tailwind CSS. Store, organize, and share your code snippets with powerful search, tagging, and collaboration features.

## 🎯 Project Vision

Code Vault aims to be the ultimate code snippet management platform for developers, teams, and organizations. It provides a clean, fast, and intuitive interface for managing code snippets with advanced features like syntax highlighting, version control, sharing, and team collaboration.

## 📋 Feature Roadmap

### Phase 1: Core Foundation (MVP)

- [ ] **User Authentication & Authorization**

  - [ ] Sign up/Sign in with email/password
  - [ ] OAuth integration (GitHub, Google, Microsoft)
  - [ ] User profile management
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

- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **File Storage**: AWS S3 or Vercel Blob
- **Search**: PostgreSQL Full-Text Search or Algolia
- **Caching**: Redis for session management

### Infrastructure

- **Hosting**: Vercel (Frontend) + Railway/Supabase (Backend)
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics + Sentry
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Main application routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── editor/           # Code editor components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication config
│   ├── db.ts             # Database connection
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── store/                # State management
├── types/                # TypeScript type definitions
└── styles/               # Additional styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

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

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
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

# Database
pnpm db:push         # Push schema changes to database
pnpm db:seed         # Seed database with sample data
pnpm db:studio       # Open Prisma Studio

# Testing
pnpm test            # Run unit tests
pnpm test:e2e        # Run end-to-end tests
pnpm test:coverage   # Run tests with coverage
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

## 📊 Database Schema

### Core Entities

```sql
Users
├── id (UUID, Primary Key)
├── email (String, Unique)
├── name (String)
├── avatar (String, Optional)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Snippets
├── id (UUID, Primary Key)
├── title (String)
├── description (Text, Optional)
├── content (Text)
├── language (String)
├── isPublic (Boolean)
├── userId (UUID, Foreign Key)
├── createdAt (DateTime)
└── updatedAt (DateTime)

Tags
├── id (UUID, Primary Key)
├── name (String, Unique)
├── color (String)
└── createdAt (DateTime)

Collections
├── id (UUID, Primary Key)
├── name (String)
├── description (Text, Optional)
├── userId (UUID, Foreign Key)
├── isPublic (Boolean)
└── createdAt (DateTime)
```

## 🔒 Security Considerations

- **Authentication**: JWT tokens with refresh mechanism
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Server-side validation with Zod
- **Rate Limiting**: API rate limiting with Upstash Redis
- **Content Security**: XSS protection and sanitization
- **Privacy**: GDPR compliance and data encryption

## 🚀 Deployment

### Production Environment

- **Frontend**: Vercel (automatic deployments from main branch)
- **Database**: Supabase or PlanetScale
- **File Storage**: Vercel Blob or AWS S3
- **Monitoring**: Vercel Analytics + Sentry

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="https://your-domain.com"

# OAuth Providers
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# File Storage
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
