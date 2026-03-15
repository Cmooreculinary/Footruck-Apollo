import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      // Extract session_id from URL hash
      const hash = window.location.hash;
      const sessionIdMatch = hash.match(/session_id=([^&]+)/);
      
      if (!sessionIdMatch) {
        console.error('No session_id in URL');
        navigate('/', { replace: true });
        return;
      }

      const sessionId = sessionIdMatch[1];

      try {
        // Exchange session_id for session_token
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ session_id: sessionId })
        });

        if (!response.ok) {
          throw new Error('Failed to exchange session');
        }

        const data = await response.json();
        
        // Clear the hash from URL
        window.history.replaceState(null, '', window.location.pathname);
        
        // Refresh auth state and navigate to dashboard
        await checkAuth();
        navigate('/', { replace: true, state: { user: data.user } });
        
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/', { replace: true });
      }
    };

    processAuth();
  }, [navigate, checkAuth]);

  return (
    <div className="min-h-screen bg-[#141210] flex items-center justify-center">
      <div className="text-center">
        <Truck className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
        <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin mb-4" />
        <p className="text-white text-lg font-medium">Signing you in...</p>
        <p className="text-slate-500 text-sm mt-2">Please wait while we set up your account</p>
      </div>
    </div>
  );
};

export default AuthCallback;
