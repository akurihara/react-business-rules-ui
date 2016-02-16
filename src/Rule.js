import React, { Component, PropTypes } from 'react';
import { findIndex } from 'lodash';

class Rule extends Component {

  renderVariableSelect() {
    const { condition: { name }, variables } = this.props;

    return (
      <select className="field" value={name}>
        {variables.map(this.renderVariableOption)}
      </select>
    );
  }

  renderVariableOption(variable) {
    return (
      <option key={variable.name} value={variable.name}>{variable.label}</option>
    );
  }

  renderOperatorSelect() {
    const { condition: { name, operator }, variables } = this.props;
    const index = findIndex(variables, { name });
    const variable = variables[index];

    return (
      <select className="operator" value={operator}>
        {variable.operator.map(this.renderOperatorOption)}
      </select>
    );
  }

  renderOperatorOption(operator) {
    return (
      <option key={operator.name} value={operator.name}>{operator.label}</option>
    );
  }

  render() {
    return (
      <div className="rule">
        {this.renderVariableSelect()}
        {this.renderOperatorSelect()}
        <input type="text" className="value numberInput" />
        <a className="remove" href="#">Remove</a>
      </div>
    );
  }
}

Rule.propTypes = {
  condition: PropTypes.shape({
    name: PropTypes.string,
    operator: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ])
  }),
  variables: PropTypes.array
};

export default Rule;
