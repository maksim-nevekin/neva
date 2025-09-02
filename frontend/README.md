# Frontend Authentication System

This React frontend includes a complete authentication system with the following features:

## Features

### 🔐 Authentication
- **User Registration**: Create new accounts with email, username, and password
- **User Login**: Secure login with username/email and password
- **Protected Routes**: Automatic redirection based on authentication status
- **Session Management**: JWT token-based authentication with cookies

### 🎉 User Experience
- **Success Alerts**: Toast notifications for successful operations
- **Error Handling**: Clear error messages for failed operations
- **Loading States**: Visual feedback during API calls
- **Automatic Redirection**: Seamless navigation after successful actions

### 🎨 UI Components
- **Modern Design**: Clean, responsive interface with consistent styling
- **Toast Notifications**: Non-intrusive success/error messages
- **Progress Indicators**: Loading animations and progress bars
- **Responsive Layout**: Works on desktop and mobile devices

## CSS Architecture

### 🎯 **Best Practices Implemented**
- **No Inline Styles**: All styling moved to dedicated CSS files
- **Component-Scoped CSS**: Each component has its own stylesheet
- **CSS Modules**: Organized, maintainable styling structure
- **Responsive Design**: Mobile-first approach with media queries
- **Accessibility**: Proper focus states and keyboard navigation

### 📁 **CSS File Structure**
```
src/styles/
├── index.css          # Main stylesheet with imports and global styles
├── auth.css           # Authentication forms styling
├── home.css           # Home page component styling
└── header.css         # Header component styling
```

### 🚫 **Why Not Inline Styles?**
- **Performance**: Inline styles are recreated on every render
- **Maintainability**: Hard to maintain and reuse styles
- **CSS Features**: Can't use pseudo-selectors, media queries, animations
- **Code Readability**: JSX becomes cluttered and hard to read
- **Bundle Size**: Inline styles increase JavaScript bundle size

## How It Works

### Registration Flow
1. User fills out registration form
2. Form validation ensures data quality
3. API call creates new user account
4. Success toast notification appears
5. Success screen shows with progress bar
6. Automatic redirect to home page after 2 seconds

### Login Flow
1. User enters credentials
2. API call authenticates user
3. Success toast notification appears
4. Automatic redirect to home page
5. User sees personalized dashboard

### Navigation
- **Unauthenticated users**: Redirected to `/login` or `/register`
- **Authenticated users**: Redirected to `/` (home page)
- **Protected routes**: Only accessible to logged-in users

## File Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx          # Login form component
│   │   ├── Register.jsx       # Registration form component
│   │   └── ProtectedRoute.jsx # Route protection component
│   ├── Layout/
│   │   └── Header.jsx         # Navigation header
│   └── Home.jsx               # Home page component
├── contexts/
│   └── AuthContext.jsx        # Authentication state management
├── styles/
│   ├── index.css              # Main stylesheet with imports
│   ├── auth.css               # Authentication styles
│   ├── home.css               # Home page styles
│   └── header.css             # Header styles
├── api/
│   └── client.js              # API client configuration
└── App.jsx                    # Main application component
```

## Dependencies

- **react-hot-toast**: Toast notification system
- **react-router-dom**: Client-side routing
- **js-cookie**: Cookie management for tokens
- **axios**: HTTP client for API calls

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:5173`

## Customization

### CSS Styling
Modify component styles in their respective CSS files:
- **Authentication forms**: `src/styles/auth.css`
- **Home page**: `src/styles/home.css`
- **Header**: `src/styles/header.css`
- **Global styles**: `src/styles/index.css`

### Toast Notifications
Modify toast options in `App.jsx`:
```jsx
<Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: { background: '#363636', color: '#fff' },
    success: { duration: 3000 },
    error: { duration: 4000 }
  }}
/>
```

### Redirect Timing
Adjust redirect delays in `Register.jsx` and `Login.jsx`:
```jsx
// Change from 2000ms to desired delay
setTimeout(() => {
  navigate('/')
}, 2000)
```

### Auto-Login After Registration
Enable automatic login after registration by uncommenting the code in `AuthContext.jsx`:
```jsx
// Uncomment to auto-login after registration
if (response.data.access_token) {
  const { access_token, refresh_token } = response.data
  setToken(access_token)
  // ... rest of auto-login code
}
```

## CSS Best Practices

### ✅ **Do's**
- Use semantic class names (e.g., `.auth-container`, `.form-input`)
- Implement responsive design with media queries
- Use CSS custom properties for consistent theming
- Follow BEM methodology for complex components
- Keep CSS files focused and single-purpose

### ❌ **Don'ts**
- Avoid inline styles in JSX
- Don't use !important unless absolutely necessary
- Avoid deeply nested selectors
- Don't mix styling approaches

## Backend Integration

This frontend expects a FastAPI backend with the following endpoints:
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /auth/me` - Get current user info

Ensure your backend returns appropriate JWT tokens and user data for seamless integration.
