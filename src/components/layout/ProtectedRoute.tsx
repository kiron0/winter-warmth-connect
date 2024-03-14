import useAuth from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
          const { token } = useAuth();

          if (!token) {
                    return <Navigate to="/login" replace={true} />;
          }

          return children;
}