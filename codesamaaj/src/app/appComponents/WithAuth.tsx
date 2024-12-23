// withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const adminToken = Cookies.get('adminToken');

    useEffect(() => {
      if (!adminToken) {
        router.push('/admin-login');
      }
    }, [adminToken, router]);

    if (!adminToken) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default withAuth;
