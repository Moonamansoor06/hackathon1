export default {
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
      {
        name: 'Review_ID',
        title: 'Review ID',
        type: 'number',
      },
      {
        name: 'User_ID',
        title: 'User ID',
        type: 'number',
      },
      {
        name: 'Product_ID',
        title: 'Product ID',
        type: 'number',
      },
      {
        name: 'Rating',
        title: 'Rating',
        type: 'number',
      },
      {
        name: 'Comment',
        title: 'Comment',
        type: 'text',
      },
      {
        name: 'Review_Date',
        title: 'Review Date',
        type: 'datetime',
      },
    ],
  };
  