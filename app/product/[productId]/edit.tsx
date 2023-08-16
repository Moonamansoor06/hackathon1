import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '@/sanity/lib/client';

const ProductEdit = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { productId } = router.query;
      const productData = await client.fetch(`*[_type == 'product' && _id == '${productId}'][0]`);
      setProduct(productData);
    };

    fetchProduct();
  }, [router.query]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productId } = router.query;

    const updatedProduct = {
      ...product,
      _type: 'product',
    };

    await client
      .patch(productId)
      .set(updatedProduct)
      .commit();

    router.push('/');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input
            type="number"
            name="Product_ID"
            value={product.Product_ID}
            onChange={handleChange}
          />
        </label>

        <label>
          Product SKU:
          <input
            type="text"
            name="Product_sku"
            value={product.Product_sku}
            onChange={handleChange}
          />
        </label>

        <label>
          Product Name:
          <input
            type="text"
            name="Product_name"
            value={product.Product_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Product Category:
          <input
            type="number"
            name="Product_Category"
            value={product.Product_Category}
            onChange={handleChange}
          />
        </label>

        <label>
          Seller ID:
          <input
            type="number"
            name="Seller_ID"
            value={product.Seller_ID}
            onChange={handleChange}
          />
        </label>

        {/* Add fields for variants (size, color, quantity, thumbnail, image) based on your schema */}

        <label>
          Description:
          <textarea
            name="Description"
            value={product.Description}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="Price"
            value={product.Price}
            onChange={handleChange}
          />
        </label>

        {/* Add field for Image based on your schema */}

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductEdit;
