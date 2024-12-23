// withAuth.tsx
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const SignupWithAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const paymentStatus = Cookies.get('paymentStatus'); 

    useEffect(() => {
        console.log("value of paymentStatus:", paymentStatus);

      if (!paymentStatus) {
        router.push('/');
      }
    }, [paymentStatus, router]);

    if (!paymentStatus) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
};

export default SignupWithAuth;
