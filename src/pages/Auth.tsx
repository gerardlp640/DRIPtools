import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, AuthError } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase/config';
import Button from '../components/ui/Button';
import { LogIn } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSSOLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError(null);
    try {
      const authProvider = provider === 'google' ? googleProvider : facebookProvider;
      await signInWithPopup(auth, authProvider);
      navigate('/dashboard');
    } catch (err) {
      const authError = err as AuthError;
      if (authError.code === 'auth/popup-blocked') {
        setError('Please allow popups for this site to enable login. Check your browser settings and try again.');
      } else {
        setError('Authentication failed. Please try again.');
      }
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-primary py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-medium">REGISTER</div>
            <div className="text-white font-medium">LOG IN</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
          <p className="text-text-secondary text-center mb-8">
            Log in with your Google or Facebook account
          </p>

          <div className="space-y-4">
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSSOLogin('google')}
              isLoading={isLoading}
              className="flex items-center justify-center"
              leftIcon={<LogIn className="h-5 w-5" />}
            >
              Log in with Google
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSSOLogin('facebook')}
              isLoading={isLoading}
              className="flex items-center justify-center"
              leftIcon={<LogIn className="h-5 w-5" />}
            >
              Log in with Facebook
            </Button>

            {error && (
              <div className="text-error text-sm text-center mt-4">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 bg-background-subtle rounded-md">
            <p className="text-sm text-text-secondary text-center">
              We use single sign-on (SSO) to secure your login experience without storing your private data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;