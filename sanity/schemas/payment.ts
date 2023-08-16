export default {
    name: 'payment',
    title: 'Payment',
    type: 'document',
    fields: [
      {
        name: 'Payment_ID',
        title: 'Payment ID',
        type: 'number',
      },
      {
        name: 'Order_ID',
        title: 'Order ID',
        type: 'number',
      },
      {
        name: 'Payment_Date',
        title: 'Payment Date',
        type: 'datetime',
      },
      {
        name: 'Payment_Method',
        title: 'Payment Method',
        type: 'string',
      },
      {
        name: 'Amount',
        title: 'Amount',
        type: 'number',
      },
    ],
  };
  