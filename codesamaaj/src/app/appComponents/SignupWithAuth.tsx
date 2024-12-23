import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SignupWithAuth = (WrappedComponent: React.ComponentType) => {
  const ProtectedRoute = (props: any) => {
    const router = useRouter();
    const paymentStatus = Cookies.get('paymentStatus'); 

    useEffect(() => {
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
