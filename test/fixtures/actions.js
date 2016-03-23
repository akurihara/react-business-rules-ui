const ActionsFixtures = {

  simpleAction: {
    name: 'put_on_sale',
    params: {}
  },

  numericAction: {
    name: 'order_more',
    params: {
      number_to_order: 1
    }
  },

  textAction: {
    name: 'send_email',
    params: {
      email: 'john.smith@test.com'
    }
  },

  selectAction: {
    name: 'play_music',
    params: {
      genre: 'Rock'
    }
  }
};

export default ActionsFixtures;
