import React, { Component } from 'react';
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
  ],
  select: [
    {
      name: 'contains',
      label: 'Contains',
      input_type: 'select'
    },
    {
      name: 'does_not_contain',
      label: 'Does Not Contain',
      input_type: 'select'
    }
  ],
  select_multiple: [
    {
      name: 'contains_all',
      label: 'Contains All',
      input_type: 'select_multiple'
    },
    {
      name: 'is_contained_by',
      label: 'Is Contained By',
      input_type: 'select_multiple'
    },
    {
      name: 'shares_at_least_one_element_with',
      label: 'Shares At Least One Element With',
      input_type: 'select_multiple'
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
  },
  {
    name: 'goes_well_with',
    label: 'Goes Well With',
    field_type: 'select',
    options: ['Eggnog', 'Cookies', 'Beef Jerkey']
  },
  {
    name: 'goes_great_with',
    label: 'Goes Great With',
    field_type: 'select_multiple',
    options: ['Burgers', 'French Fries', 'Shakes']
  }
];

const initialConditions = {
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
          name: 'goes_well_with',
          operator: 'contains',
          value: 'Beef Jerkey',
        }
      ]
    }
  ]
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { conditions: initialConditions };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(conditions) {
    this.setState({ conditions });
  }

  render() {
    return (
      <div>
        <h1>Conditions and Actions Demo</h1>
        <h3>When these conditions are met...</h3>
        <ConditionsBuilder
          conditions={this.state.conditions}
          operators={operators}
          variables={variables}
          onUpdate={this.handleUpdate}
        />
        <h3>Do these actions...</h3>
        <div id="actions"></div>
        <button id="submit" type="button">Pretend Submit</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
