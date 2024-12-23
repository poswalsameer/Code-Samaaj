// withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const FeedbackWithAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    
    const router = useRouter();
    const authToken = Cookies.get('authToken');

    useEffect(() => {
      if (!authToken) {
        router.push('/login');
      }
    }, [authToken, router]);

    if (!authToken) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default FeedbackWithAuth;
