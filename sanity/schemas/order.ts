export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'Order_ID',
        title: 'Order ID',
        type: 'number',
      },
      {
        name: 'User_ID',
        title: 'User ID',
        type: 'number',
      },
      {
        name: 'Order_Date',
        title: 'Order Date',
        type: 'datetime',
      },
      {
        name: 'Total_Price',
        title: 'Total Price',
        type: 'number',
      },
    ],
  };
  