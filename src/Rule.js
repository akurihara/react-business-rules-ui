import React, { Component, PropTypes } from 'react';
import { assign, findIndex } from 'lodash';

class Rule extends Component {

  constructor(props) {
    super(props);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleVariableChange = this.handleVariableChange.bind(this);
  }

  handleVariableChange(e) {
    const { condition, index, onUpdate } = this.props;
    const updatedCondition = assign({}, condition, { name: e.target.value });
    onUpdate(updatedCondition, index);
  }

  handleOperatorChange(e) {
    const { condition, index, onUpdate } = this.props;
    const updatedCondition = assign({}, condition, { operator: e.target.value });
    onUpdate(updatedCondition, index);
  }

  handleValueChange(e) {
    const { condition, index, onUpdate } = this.props;
    const updatedCondition = assign({}, condition, { value: e.target.value });
    onUpdate(updatedCondition, index);
  }

  handleRemove() {
    const { index, onRemove } = this.props;
    onRemove(index);
  }

  renderVariableSelect() {
    const { condition: { name }, variables } = this.props;

    return (
      <select className="field" value={name} onChange={this.handleVariableChange}>
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
      <select className="operator" value={operator} onChange={this.handleOperatorChange}>
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
        <input
          className="value numberInput"
          defaultValue={0}
          onChange={this.handleValueChange}
          type="text"
          value={this.props.condition.value}
        />
        <a className="remove" href="#" onClick={this.handleRemove}>Remove</a>
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
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  variables: PropTypes.array
};

export default Rule;
