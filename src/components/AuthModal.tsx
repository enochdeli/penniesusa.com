import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase';
import { X, Mail, Lock, User, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isAuthModalOpen) return null;

  const switchMode = (newMode: 'login' | 'signup' | 'reset') => {
    setMode(newMode);
    setError('');
    setMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setMessage('');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!formData.email.trim()) {
      setError("Please enter your email address first.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setMessage("Password reset link sent! Please check your inbox.");
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || '';
      const errorCode = err.code || '';

      if (errorCode === 'auth/user-not-found' || errorMessage.includes('user-not-found')) {
        setError("No account found with this email.");
      } else {
        setError(errorMessage || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!formData.name.trim()) throw new Error("Name is required");
        
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        // Update user profile immediately
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
        
      } else {
        await signInWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
      }
      closeAuthModal();
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.message || '';
      const errorCode = err.code || '';

      if (errorCode === 'auth/email-already-in-use' || errorMessage.includes('email-already-in-use')) {
        setError("This email is already registered. Try logging in.");
      } else if (
        errorCode === 'auth/wrong-password' || 
        errorCode === 'auth/user-not-found' || 
        errorCode === 'auth/invalid-credential' ||
        errorMessage.includes('wrong-password') ||
        errorMessage.includes('user-not-found') ||
        errorMessage.includes('invalid-credential')
      ) {
        setError("Invalid email or password.");
      } else if (errorCode === 'auth/weak-password' || errorMessage.includes('weak-password')) {
        setError("Password should be at least 6 characters.");
      } else {
        setError(errorMessage || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 pb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
              {mode === 'signup' ? 'Create an Account' : mode === 'reset' ? 'Reset Password' : 'Welcome Back'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'signup' 
                ? 'Join penniesusa to access premium features and global insights.' 
                : mode === 'reset'
                ? 'Enter your email address and we will send you a link to reset your password.'
                : 'Log in to your penniesusa account to continue.'}
            </p>
          </div>

          <form onSubmit={mode === 'reset' ? handleResetPassword : handleSubmit} className="px-8 pb-8 space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-sm mb-4">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {message && (
              <div className="flex items-start gap-2 p-3 bg-green-50 text-green-700 rounded-xl text-sm mb-4">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p>{message}</p>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => switchMode('reset')}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-500 focus:outline-none"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition-colors mt-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                mode === 'signup' ? 'Create Account' : mode === 'reset' ? 'Send Reset Link' : 'Sign In'
              )}
            </button>
            
            {mode !== 'reset' && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              </>
            )}
            
            <p className="text-center text-sm text-gray-600 mt-6">
              {mode === 'reset' ? (
                <button 
                  type="button" 
                  onClick={() => switchMode('login')}
                  className="font-semibold text-brand-600 hover:text-brand-500"
                >
                  Back to log in
                </button>
              ) : (
                <>
                  {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                  <button 
                    type="button" 
                    onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
                    className="font-semibold text-brand-600 hover:text-brand-500"
                  >
                    {mode === 'signup' ? 'Log in' : 'Sign up'}
                  </button>
                </>
              )}
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
