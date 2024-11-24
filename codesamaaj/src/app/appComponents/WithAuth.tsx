// withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const adminToken = Cookies.get('adminToken'); // Get token from cookies

    useEffect(() => {
        console.log("value of adminToken:", adminToken);
      // If no token, redirect to the login page
      if (!adminToken) {
        router.push('/admin-login');
      }
    //   else{
    //     router.push("/admin");
    //   }
    }, [adminToken, router]);

    // If no token is found, don't render the component yet (loading state)
    if (!adminToken) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default withAuth;
