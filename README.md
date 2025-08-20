# Full-Stack Authentication System

A complete authentication system built with TypeScript, featuring user registration, login, email verification, and password reset functionality.

## 🚀 Features

- **User Registration** - Secure account creation with email verification
- **User Login** - JWT-based authentication
- **Email Verification** - Account activation via email
- **Password Reset** - Secure password reset with email tokens
- **Protected Routes** - JWT-based route protection
- **TypeScript** - Full type safety across frontend and backend

## 📊 Project Status

### ✅ Completed
- **Project Structure** - Complete directory organization
- **Backend Foundation** - Express server with security middleware
- **Database Setup** - MongoDB connection with error handling
- **User Model** - Complete schema with authentication features
  - Password hashing with bcrypt
  - Email verification tokens
  - Password reset functionality
  - TypeScript interfaces
  - Virtual fields and custom methods
- **Type Definitions** - Comprehensive TypeScript types
- **Test Routes** - User model validation endpoints

### 🚧 In Progress
- **Authentication Controllers** - Business logic for auth operations
- **API Routes** - RESTful endpoints for authentication
- **Middleware** - JWT authentication and validation
- **Email Service** - Nodemailer configuration and templates

### 📋 Planned
- **Frontend Foundation** - React components and routing
- **Authentication UI** - Registration and login forms
- **Protected Routes** - Frontend route guards
- **Email Templates** - HTML email designs
- **Testing** - Unit and integration tests
- **Deployment** - Production setup and deployment

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email services

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **Context API** for state management

## 📁 Project Structure

```
fullstack-auth-ts/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and app configuration
│   │   │   ├── database.ts  # MongoDB connection setup
│   │   │   └── index.ts     # Configuration exports
│   │   ├── controllers/     # Business logic handlers
│   │   │   ├── auth.controller.ts    # Authentication logic
│   │   │   ├── user.controller.ts    # User management logic
│   │   │   └── index.ts     # Controller exports
│   │   ├── models/          # Mongoose schemas and models
│   │   │   ├── User.ts      # User model with authentication
│   │   │   └── index.ts     # Model exports
│   │   ├── routes/          # API endpoint definitions
│   │   │   ├── auth.routes.ts        # Authentication routes
│   │   │   ├── user.routes.ts        # User management routes
│   │   │   └── index.ts     # Route exports
│   │   ├── middleware/      # Custom Express middleware
│   │   │   ├── auth.middleware.ts    # JWT authentication
│   │   │   ├── validation.middleware.ts # Input validation
│   │   │   └── index.ts     # Middleware exports
│   │   ├── utils/           # Utility functions
│   │   │   ├── hashPassword.ts       # Password hashing utilities
│   │   │   └── index.ts     # Utility exports
│   │   ├── templates/       # Email templates
│   │   │   ├── verification.html     # Email verification template
│   │   │   └── reset-password.html   # Password reset template
│   │   ├── types/           # TypeScript type definitions
│   │   │   ├── user.types.ts         # User-related types
│   │   │   └── index.ts     # Type exports
│   │   └── server.ts        # Express app entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── forms/       # Form components
│   │   │   ├── layout/      # Layout components
│   │   │   └── ui/          # Basic UI components
│   │   ├── pages/           # Route components
│   │   │   ├── auth/        # Authentication pages
│   │   │   ├── dashboard/   # Protected pages
│   │   │   └── index.ts     # Page exports
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.ts   # Authentication hook
│   │   │   └── index.ts     # Hook exports
│   │   ├── context/         # React Context providers
│   │   │   ├── AuthContext.tsx       # Authentication context
│   │   │   └── index.ts     # Context exports
│   │   ├── services/        # API service functions
│   │   │   ├── auth.service.ts       # Authentication API calls
│   │   │   ├── user.service.ts       # User API calls
│   │   │   └── index.ts     # Service exports
│   │   ├── types/           # TypeScript type definitions
│   │   │   ├── auth.types.ts         # Authentication types
│   │   │   ├── user.types.ts         # User types
│   │   │   └── index.ts     # Type exports
│   │   ├── utils/           # Utility functions
│   │   │   ├── validation.ts         # Form validation
│   │   │   └── index.ts     # Utility exports
│   │   ├── App.tsx          # Main App component
│   │   ├── main.tsx         # App entry point
│   │   └── index.css        # Global styles
│   ├── .env.example         # Environment variables template
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:satyanxsharma/fullstack-auth-ts.git
   cd fullstack-auth-ts
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup environment variables**
   ```bash
   # Backend
   cd ../backend
   cp .env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run type-check` - Check TypeScript types

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Protected Routes
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

## 🔒 Security Features

- **Password Hashing** - Bcrypt with configurable rounds
- **JWT Tokens** - Secure token-based authentication
- **Input Validation** - Server-side validation with express-validator
- **Rate Limiting** - Prevent brute force attacks
- **CORS Configuration** - Secure cross-origin requests
- **Security Headers** - Helmet.js for HTTP security headers

## 📧 Email Configuration

This project uses Nodemailer for sending emails. Configure your email service in the backend `.env` file:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🚀 Deployment

### Backend Deployment
- Build the project: `npm run build`
- Set production environment variables
- Start with: `npm start`

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `dist/` folder to your hosting service

## 📚 Learning Resources

This project demonstrates:
- Modern TypeScript patterns
- RESTful API design
- React hooks and context
- JWT authentication flow
- Email integration
- Security best practices
- MongoDB/Mongoose usage
- Modern CSS with Tailwind

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for learning full-stack development
- Demonstrates modern web development practices
- Production-ready authentication patterns