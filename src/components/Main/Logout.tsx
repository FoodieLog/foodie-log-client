import { useRouter } from 'next/navigation';
import { useUserStore } from '@/src/store/useUserStore';
import { getMessaging, deleteToken } from 'firebase/messaging';
import firebaseApp from '@/firebaseConfig';
import { TbLogout2 } from 'react-icons/tb';

const Logout = () => {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    // Clear user from zustand store
    clearUser();

    // Delete FCM token from IndexedDB
    const messaging = getMessaging(firebaseApp);
    try {
      const currentToken = await deleteToken(messaging);
      if (currentToken) {
        console.log('Token deleted.');
      }
    } catch (error) {
      console.error('Failed to delete token: ', error);
    }

    // Navigate to login page
    router.replace('/accounts/login');
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleLogout}>
      <TbLogout2 className="text-2xl mx-2" />
      <p className="ml-2 max-lg:hidden">Logout</p>
    </div>
  );
};

export default Logout;
