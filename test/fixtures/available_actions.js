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
    },
    {
      name: 'send_email',
      label: 'Send Email',
      params: [
        {
          name: 'email',
          label: 'Email',
          fieldType: 'text',
          options: []
        }
      ]
    },
    {
      name: 'play_music',
      label: 'Play Music',
      params: [
        {
          name: 'genre',
          label: 'Genre',
          fieldType: 'select',
          options: ['Rock', 'Pop', 'Hip Hop']
        }
      ]
    }
  ]
};

export default AvailableActionsFixtures;
