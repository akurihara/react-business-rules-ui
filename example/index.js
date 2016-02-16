import React from 'react';
import { render } from 'react-dom';
import { ConditionsBuilder } from '../src';

const operators = {
  numeric: [
    {
      name: 'equal_to',
      label: 'Equal To',
      input_type: 'numeric'
    },
    {
      name: 'greater_than',
      label: 'Greater Than',
      input_type: 'numeric'
    },
    {
      name: 'less_than',
      label: 'Less Than',
      input_type: 'numeric'
    }
  ]
};

const variables = [
  {
    name: 'expiration_days',
    label: 'Expiration Days',
    field_type: 'numeric',
    options: []
  },
  {
    name: 'current_inventory',
    label: 'Current Inventory',
    field_type: 'numeric',
    options: []
  }
];

const rules = {
  all: [
    {
      name: 'expiration_days',
      operator: 'less_than',
      value: 5,
    },
    {
      any: [
        {
          name: 'current_inventory',
          operator: 'greater_than',
          value: 20,
        },
        {
          name: 'current_inventory',
          operator: 'less_than',
          value: 30,
        }
      ]
    }
  ]
};

const props = { rules, operators, variables };
render(<ConditionsBuilder {...props} />, document.getElementById('conditions'));
