"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getAllProductsBySeller } from '@/fetch/productBySeller';

const SellerDashboard = (params) => {
  const sellerId = params.sellerId.sellerId[1];
  console.log("seller id from dashboard seller is", sellerId);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProductsBySeller(params);
      console.log("products by fetch", products);
      setProducts(products);
    };
    fetchProducts();
  }, [sellerId]);

  const handleEdit = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, isEditing: true } : product
      )
    );
  };

  const handleEditSave = async (product) => {
    const { _id, ...updatedProduct } = product;

    await client
      .patch(_id)
      .set(updatedProduct)
      .commit();

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === _id ? { ...p, ...updatedProduct, isEditing: false } : p
      )
    );
  };

  const handleCancelEdit = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, isEditing: false } : product
      )
    );
  };

  const handleDelete = async (id) => {
    await client
      .delete(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEditField = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const handleAddProduct = () => {
    // Redirect to the add product page
    router.push('/product/add');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product SKU</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Variants</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2">
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.Product_sku}
                      onChange={(e) =>
                        handleEditField(product._id, 'Product_sku', e.target.value)
                      }
                    />
                  ) : (
                    product.Product_sku
                  )}
                </td>
                <td className="border px-4 py-2">
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.Product_name}
                      onChange={(e) =>
                        handleEditField(product._id, 'Product_name', e.target.value)
                      }
                    />
                  ) : (
                    product.Product_name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {product.isEditing ? (
                    <textarea
                      value={product.Description}
                      onChange={(e) =>
                        handleEditField(product._id, 'Description', e.target.value)
                      }
                    />
                  ) : (
                    <div className="whitespace-pre-wrap h-20 overflow-y-auto">
                      {product.Description}
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {product.variants.map((variant) => (
                    <div key={variant.size + variant.color}>
                      Size: {variant.size}, Color: {variant.color}, Quantity: {variant.quantity}
                    </div>
                  ))}
                </td>
                <td className="border px-4 py-2">
                  {product.isEditing ? (
                    <input
                      type="text"
                      value={product.Price}
                      onChange={(e) =>
                        handleEditField(product._id, 'Price', e.target.value)
                      }
                    />
                  ) : (
                    product.Price
                  )}
                </td>
                <td className="border px-4 py-2">
                  {product.isEditing ? (
                    <>
                      <button
                        onClick={() => handleEditSave(product)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelEdit(product._id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
