export default {
    title: 'variants',
    name: 'variants',
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
  };