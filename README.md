# Alma

A lead management application built with Next.js, featuring a public lead submission form and an administrative dashboard for managing prospects.

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:abraaolevi/alma.git
   cd alma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   # DATABASE_URL="file:./db.sqlite"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Seed the database with initial data
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`


### Key Features Demo

#### **Public Form** (`/`)
1. Navigate to the homepage
2. Fill out the lead information form
3. Upload a resume (optional)
4. Submit and view confirmation page

#### **Admin Dashboard** (`/admin/dashboard`)
1. Login with credentials: `username: admin`, `password: password`
2. View paginated leads table
3. Search and filter leads
4. Update lead status
5. Download uploaded files



## Design Decisions

### Architecture Choices

#### **Styled Components**
Styled Components was chosen as the styling solution to maintain component-scoped styles and prevent CSS conflicts. Initially, Tailwind CSS was considered for rapid prototyping, but to meet the requirement of using CSS rather than utility classes, Styled Components provided a better balance. The TypeScript integration offers IntelliSense support and compile-time error checking for styles.

#### **React Hook Form**
React Hook Form was selected for form management due to familiarity with the library. While JsonForms was discovered during development and appears promising for schema-driven form generation, React Hook Form was chosen to ensure timely delivery.

#### **Prisma + SQLite**
Prisma ORM was selected for its strong TypeScript integration, generating types directly from the database schema. This approach ensures type safety across the entire data layer. SQLite serves as the development database for simplicity and portability, while Prisma's database-agnostic design allows for seamless migration to PostgreSQL or MySQL in production environments.

#### **Zustand State Management**
Zustand provides a lightweight alternative to Redux with minimal boilerplate code. The library offers excellent TypeScript support with automatic type inference and integrates well with Redux DevTools for debugging. The leads store manages application state including data, pagination, and API calls without persistence, resetting on page refresh.

#### **Zod Validation**
Zod handles both client-side and server-side validation through shared schemas. The library provides runtime type checking and automatic TypeScript type generation from validation schemas. This approach ensures API contracts are enforced and provides consistent error handling across the application. Validation rules include file size limits (5MB), allowed file types (PDF/DOC/DOCX), and standard field validation for emails and URLs.

### Authentication and Security

The current authentication system uses hardcoded credentials (`admin`/`password`) for demonstration purposes. The implementation stores authentication tokens in localStorage for simplicity. In a production environment, this would be replaced with OAuth providers, JWT tokens stored in HTTP-only cookies, and proper session management with role-based access control.

### Testing Strategy

The application includes unit tests using Jest and React Testing Library, focusing on user interactions rather than implementation details. Current coverage includes UI components with plans for Cypress end-to-end testing to validate complete user workflows from form submission to dashboard management.

### File Storage

File uploads are handled locally in the development environment to focus on frontend implementation. Production deployment would typically integrate with cloud storage services like AWS S3 or Google Cloud Storage for scalability and reliability.


### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **React Hook Form** - Form management
- **Zustand** - State management

### Backend
- **Next.js API Routes** - Server-side logic
- **Prisma ORM** - Database management
- **SQLite** - Development database
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **React Testing Library** - Component testing
- **TypeScript** - Static type checking

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (lead-form)/             # Public lead form pages
│   │   ├── page.tsx             # Main lead form
│   │   └── components/          # Form-specific components
│   ├── admin/                   # Administrative interface
│   │   └── dashboard/           # Lead management dashboard
│   ├── api/                     # API routes
│   │   ├── leads/               # Lead management endpoints
│   │   └── upload/              # File upload endpoints
│   ├── login/                   # Authentication pages
│   ├── thank-you/               # Success confirmation
│   └── layout.tsx               # Root layout component
├── components/                   # Reusable UI components
│   ├── forms/                   # Form components
│   └── ui/                      # Base UI components
├── contexts/                     # React Context providers
├── hooks/                        # Custom React hooks
├── lib/                         # Utility libraries
├── schemas/                      # Zod validation schemas
├── server/                       # Server-side utilities
├── stores/                       # Zustand state management
├── styles/                       # Global styles
└── types/                        # TypeScript type definitions
```