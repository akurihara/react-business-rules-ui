import React from 'react';
import { render } from 'react-dom';
import { ConditionsBuilder } from '../src';

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

render(<ConditionsBuilder rules={rules} />, document.getElementById('conditions'));
