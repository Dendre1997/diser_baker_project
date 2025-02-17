// components/PrivateRoute.jsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase'; // Your firebase.js path
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                router.push('/login');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [router]);


    if (loading) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <>{children}</>;
};

export default PrivateRoute;