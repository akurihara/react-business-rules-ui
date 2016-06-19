const VariablesFixtures = {

  numericVariable: {
    name: 'expiration_days',
    label: 'Expiration Days',
    field_type: 'numeric',
    options: []
  },

  selectVariable: {
    name: 'goes_well_with',
    label: 'Goes Well With',
    field_type: 'select',
    options: ['Eggnog', 'Cookies', 'Beef Jerkey']
  },

  selectMultipleVariable: {
    name: 'goes_great_with',
    label: 'Goes Great With',
    field_type: 'select_multiple',
    options: ['Burgers', 'French Fries', 'Shakes']
  }
};

export default VariablesFixtures;
