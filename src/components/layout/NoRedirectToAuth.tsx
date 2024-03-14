import useAuth from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function NoRedirectToAuth({ children }: { children: ReactNode }) {
          const { token } = useAuth();

          if (token) {
                    return <Navigate to="/" replace={true} />;
          }

          return children;
}