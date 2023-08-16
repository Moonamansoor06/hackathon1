"use client"
import { useRouter } from 'next/navigation';

const UserSelectionPage = () => {
  const router = useRouter();

  const handleUserSelection = (userType) => {
    if (userType === 'customer') {
      router.push('/product');
    } else if (userType === 'seller') {
      const sellerId = prompt('Please enter your seller ID:');
      if (sellerId) {
        
        router.push(`/seller/[[...sellerId]]/${Number(sellerId)}`);
      }
    }
  };

  return (
    <div>
      <h1>Select User Type:</h1>
      <button onClick={() => handleUserSelection('customer')}>Customer</button>
      <button onClick={() => handleUserSelection('seller')}>Seller</button>
    </div>
  );
};

export default UserSelectionPage;
