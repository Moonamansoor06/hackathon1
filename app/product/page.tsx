"use client"
import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import { getAllProducts } from '../../fetch/productsList';
import { getAllcategories } from '../../fetch/categoryList';
import { useRouter } from 'next/navigation';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        console.log("products data is ",productsData)
        const updatedProducts = await fetchProductAssets(productsData);
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllcategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProductAssets = async (productsData) => {
    const updatedProducts = [];
    for (const product of productsData) {
      try {
        const asset = await fetchAsset(product.Image.asset._ref, productsData);
        const updatedProduct = {
          ...product,
          Image: {
            ...product.Image,
            asset: asset
          }
        };
        updatedProducts.push(updatedProduct);
      } catch (error) {
        //console.error(error);
        updatedProducts.push(product);
      }
    }
    return updatedProducts;
  };

  const fetchAsset = async (ref, assetData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (assetData[ref]) {
          resolve(assetData[ref]);
        } else {
          reject(new Error(`Asset not found for reference ID: ${ref}`));
        }
      }, 1000);
    });
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => String(cat.Category_ID) === String(categoryId));
    return category ? category.Name : '';
  };

  const productsByCategory = products.reduce((acc, product) => {
    const { Product_Category } = product;
    if (!acc[Product_Category]) {
      acc[Product_Category] = [];
    }
    acc[Product_Category].push(product);
    return acc;
  }, {});

  

  const handleProductDetails = (productId) => {
    console.log("product id from product is", productId);
    router.push(`/product/${productId}/`);
  };

  if (!productsByCategory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-center mx-8 my-8">
      {Object.keys(productsByCategory).map((category, index) => (
        <section key={index} className="mb-8 ml-32">
          <h1 className="text-3xl font-bold mb-4 font-head1Main underline">{getCategoryNameById(category).toUpperCase()}</h1>
          <div className="grid  mt-8 grid-cols-1 md:grid-cols-3 gap-4">
            {productsByCategory[category].map((product, index) => {
              console.log("product is",product)
              return(
              <Card
                key={index}
                product={product}
                onProductDetails={handleProductDetails}
              />
            )})}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductPage;
