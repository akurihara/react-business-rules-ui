const AvailableActionsFixtures = {

  availableActions: [
    {
      name: 'put_on_sale',
      label: 'Put On Sale',
      params: []
    },
    {
      name: 'order_more',
      label: 'Order More',
      params: [
        {
          name: 'number_to_order',
          label: 'Number To Order',
          fieldType: 'numeric',
          options: []
        }
      ]
    }
  ]
};

export default AvailableActionsFixtures;
