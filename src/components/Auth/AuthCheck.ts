"use client"
import { useEffect } from 'react';
import { useUserStore } from '@/src/store/useUserStore';
import { useRouter } from 'next/navigation';

const AuthCheck: React.FC = () => {
  const { accessToken, tokenExpiry } = useUserStore(state => state.user);
  const router = useRouter();

  useEffect(() => {
    const isTokenExpired = tokenExpiry ? Date.now() > tokenExpiry : true;

    if (accessToken && !isTokenExpired) {
      router.replace('/main/home');
    } else {
      router.replace('/accounts/login');
    }
  }, [accessToken, tokenExpiry, router]);

  return null;
};

export default AuthCheck;
