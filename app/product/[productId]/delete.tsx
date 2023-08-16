import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '@/sanity/lib/client';

const ProductDelete = () => {
  const router = useRouter();

  useEffect(() => {
    const { productId } = router.query;

    const deleteProduct = async () => {
      const mutation = `*[_id == "${productId}"] | []._id`;

      await client
        .transaction()
        .delete(mutation)
        .commit()
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    };

    if (productId) {
      deleteProduct();
    }
  }, [router.query]);

  return (
    <div>
      <h1>Delete Product</h1>
      <p>Deleting the product...</p>
    </div>
  );
};

export default ProductDelete;
