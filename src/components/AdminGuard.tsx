import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn } from '@/lib/auth';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  if (!isAdminLoggedIn()) return null;

  return <>{children}</>;
}
