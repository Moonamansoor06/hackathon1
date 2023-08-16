
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'Product_ID',
      title: 'Product ID',
      type: 'number',
    },
     {
      name: 'Product_sku',
      title: 'Product sku',
      type: 'string',
    },
     {
      name: 'Product_name',
      title: 'Product name',
      type: 'string',
    },
     {
      name: 'Product_Category',
      title: 'Product category',
      type: 'number',
    },
    {
      name: 'Seller_ID',
      title: 'Seller ID',
      type: 'number',
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Size',
              name: 'size',
              type: 'string',
            },
            {
              title: 'Color',
              name: 'color',
              type: 'string',
            },
            {
              name: 'qty',
              title: 'qty',
              type: 'number',
            },
            {
              title: 'Thumbnail',
              name: 'thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],

  preview: {
    select: {
      title: 'productName',
    },
  },
    },
    {
      name: 'Description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'Price',
      title: 'Price',
      type: 'number',
    },
    

    
       {
      name: 'Image',
      title: 'Image',
      type: 'image',
    }
  ],
};