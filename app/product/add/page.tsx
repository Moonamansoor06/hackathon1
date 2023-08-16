"use client"
// import React, { useState } from 'react';
// import { client } from '@/sanity/lib/client';

// const ProductAdd = () => {
//   const initialProduct = {
//     Product_ID: 0,
//     Product_sku: '',
//     Product_name: '',
//     Product_Category: 0,
//     Seller_ID: 0,
//     variants: [],
//     Description: '',
//     Price: 0,
//     Image: null,
//   };

//   const [product, setProduct] = useState(initialProduct);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
//   };

  // const handleVariantChange = (index, field, value) => {
  //   setProduct((prevProduct) => {
  //     const updatedVariants = [...prevProduct.variants];
  //     updatedVariants[index][field] = value;
  //     return { ...prevProduct, variants: updatedVariants };
  //   });
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setProduct((prevProduct) => ({ ...prevProduct, Image: file }));
  // };

  // const handleAddVariant = () => {
  //   setProduct((prevProduct) => ({
  //     ...prevProduct,
  //     variants: [
  //       ...prevProduct.variants,
  //       { size: '', color: '', quantity: '', thumbnail: null, image: null },
  //     ],
  //   }));
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const formData = new FormData();
//       formData.append('Product_ID', String(product.Product_ID));
//       formData.append('Product_sku', product.Product_sku);
//       formData.append('Product_name', product.Product_name);
//       formData.append('Product_Category', String(product.Product_Category));
//       formData.append('Seller_ID', String(product.Seller_ID));
//       formData.append('Description', product.Description);
//       formData.append('Price', String(product.Price));
//       formData.append('Image', product.Image);
  
//       // Append variant data to the form data
//       product.variants.forEach((variant, index) => {
//         formData.append(`variants[${index}][size]`, variant.size);
//         formData.append(`variants[${index}][color]`, variant.color);
//         formData.append(`variants[${index}][quantity]`, variant.quantity);
//         formData.append(`variants[${index}][thumbnail]`, variant.thumbnail);
//         formData.append(`variants[${index}][image]`, variant.image);
//       });
  
//       await client.create({ _type: 'product' }, { body: formData });
//       setProduct(initialProduct);
//       alert('Product created successfully!');
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Error creating product. Please try again.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="w-full max-w-md">
//         <h1 className="text-2xl text-center mb-6">Add Product</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-2">
//               Product ID:
//               <input
//                 type="number"
//                 name="Product_ID"
//                 value={product.Product_ID}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </label>

//             {/* Rest of the fields */}
//             <label className="block mb-2">
//               SKU:
//               <input
//                 type="text"
//                 name="Product_sku"
//                 value={product.Product_sku}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Product Name:
//               <input
//                 type="text"
//                 name="Product_name"
//                 value={product.Product_name}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Product Category:
//               <input
//                 type="number"
//                 name="Product_Category"
//                 value={product.Product_Category}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </label>
//             <label className="block mb-2">
//               Seller ID:
//               <input
//                 type="number"
//                 name="Seller_ID"
//                 value={product.Seller_ID}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               />
//             </label>
//             {/* ... */}

//             <label className="block mb-2">
//               Image:
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full"
//               />
//             </label>
//           </div>

//           {/* Variant fields */}
//           {product.variants.map((variant, index) => (
//             <div key={index}>
//               <h3 className="text-lg font-bold mb-2">Variant {index + 1}</h3>
//               <div className="space-y-2">
//                 <label className="block">
//                   Size:
//                   <input
//                     type="text"
//                     value={variant.size}
//                     onChange={(e) =>
//                       handleVariantChange(index, 'size', e.target.value)
//                     }
//                     className="w-full border border-gray-300 rounded-md px-3 py-2"
//                   />
//                 </label>

//                 <label className="block">
//                   Color:
//                   <input
//                     type="text"
//                     value={variant.color}
//                     onChange={(e) =>
//                       handleVariantChange(index, 'color', e.target.value)
//                     }
//                     className="w-full border border-gray-300 rounded-md px-3 py-2"
//                   />
//                 </label>

//                 <label className="block">
//                   Quantity:
//                   <input
//                     type="number"
//                     value={variant.quantity}
//                     onChange={(e) =>
//                       handleVariantChange(index, 'quantity', e.target.value)
//                     }
//                     className="w-full border border-gray-300 rounded-md px-3 py-2"
//                   />
//                 </label>
//               </div>
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={handleAddVariant}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Add Variant
//           </button>

//           <label className="block mb-2">
//             Description:
//             <textarea
//               name="Description"
//               value={product.Description}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </label>

//           <label className="block mb-2">
//             Price:
//             <input
//               type="number"
//               name="Price"
//               value={product.Price}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             />
//           </label>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductAdd;














import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';

const ProductAdd = () => {
  const [product, setProduct] = useState({
    Product_ID: 0,
    Product_sku: '',
    Product_name: '',
    Product_Category: 0,
    Seller_ID: 0,
    variants: [],
    Description: '',
    Price: 0,
    Image: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdProduct = await client.create({
        _type: 'product',
        ...product,
      });

      console.log('Product created:', createdProduct);
      router.push('/'); // Redirect to the desired page after successful product creation
    } catch (error) {
      console.error('Error creating product:', error);
      // Handle the error, show an error message, etc.
    }
  };
  const handleVariantChange = (index, field, value) => {
    setProduct((prevProduct) => {
      const updatedVariants = [...prevProduct.variants];
      updatedVariants[index][field] = value;
      return { ...prevProduct, variants: updatedVariants };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct((prevProduct) => ({ ...prevProduct, Image: file }));
  };

  const handleAddVariant = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: [
        ...prevProduct.variants,
        { size: '', color: '', quantity: '', thumbnail: null, image: null },
      ],
    }));
  };
  return (
    <div>
      <h1>Add Product</h1>

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

                   {/* Variant fields */}
           {product.variants.map((variant, index) => (
             <div key={index}>
               <h3 className="text-lg font-bold mb-2">Variant {index + 1}</h3>
               <div className="space-y-2">
                 <label className="block">
                   Size:
                   <input
                     type="text"
                     value={variant.size}
                     onChange={(e) =>
                       handleVariantChange(index, 'size', e.target.value)
                     }
                     className="w-full border border-gray-300 rounded-md px-3 py-2"
                   />
                 </label>

                 <label className="block">
                   Color:
                  <input
                     type="text"
                     value={variant.color}
                     onChange={(e) =>
                       handleVariantChange(index, 'color', e.target.value)
                     }
                     className="w-full border border-gray-300 rounded-md px-3 py-2"
                   />
                 </label>

                 <label className="block">
                   Quantity:
                   <input
                     type="number"
                     value={variant.quantity}
                     onChange={(e) =>
                       handleVariantChange(index, 'quantity', e.target.value)                     }
                     className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                 </label>
               </div>
             </div>
           ))}
           <button
             type="button"
             onClick={handleAddVariant}
             className="bg-blue-500 text-white px-4 py-2 rounded-md"           >
             Add Variant
           </button>
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

        {/* Modify the input field according to your image schema */}
        <label>
          Image:
          <input
            type="text"
            name="Image"
            value={product.Image}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
