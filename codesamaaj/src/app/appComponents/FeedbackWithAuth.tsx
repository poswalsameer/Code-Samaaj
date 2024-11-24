// withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const FeedbackWithAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const authToken = Cookies.get('authToken'); // Get token from cookies

    useEffect(() => {
        console.log("value of adminToken:", authToken);
      // If no token, redirect to the login page
      if (!authToken) {
        router.push('/login');
      }
    //   else{
    //     router.push("/admin");
    //   }
    }, [authToken, router]);

    // If no token is found, don't render the component yet (loading state)
    if (!authToken) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default FeedbackWithAuth;
