# Full-Stack Authentication System

A complete authentication system built with TypeScript, featuring user registration, login, email verification, and password reset functionality.

## 🚀 Features

- **User Registration** - Secure account creation with email verification
- **User Login** - JWT-based authentication
- **Email Verification** - Account activation via email
- **Password Reset** - Secure password reset with email tokens
- **Protected Routes** - JWT-based route protection
- **TypeScript** - Full type safety across frontend and backend

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
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── templates/       # Email templates
│   │   └── server.ts        # Express app entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Route components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React Context providers
│   │   ├── services/        # API service functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx
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
   git clone <your-repo-url>
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