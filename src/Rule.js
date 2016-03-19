import React, { Component, PropTypes } from 'react';
import { assign } from 'lodash';

class Rule extends Component {

  constructor(props) {
    super(props);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleVariableChange = this.handleVariableChange.bind(this);
  }

  static getDefaultValueForVariable(variable) {
    switch (variable.field_type) {
      case 'text':
        return '';
      case 'numeric':
        return 0;
      case 'select':
        return variable.options[0];
      case 'select_multiple':
        return [];
      default:
        return null;
    }
  }

  getVariableByName(name) {
    const { variables } = this.props;
    return variables.filter(variable => variable.name === name)[0];
  }

  getCurrentVariable() {
    const { condition: { name } } = this.props;
    return this.getVariableByName(name);
  }

  getValueFromElement(element) {
    const isSelectMultiple = this.getCurrentVariable().field_type === 'select_multiple';
    return isSelectMultiple ? this.getValuesFromSelectMultiple(element) : element.value;
  }

  getValuesFromSelectMultiple(element) {
    const values = [];
    const selectedOptions = element.selectedOptions;
    for (let i = 0; i < selectedOptions.length; i++) {
      values.push(selectedOptions[i].value);
    }
    return values;
  }

  handleVariableChange(e) {
    const { condition, index, onUpdate } = this.props;
    const newVariable = this.getVariableByName(e.target.value);
    const newOperator = newVariable.operator[0];
    const updatedCondition = assign({}, condition, {
      name: newVariable.name,
      operator: newOperator.name,
      value: Rule.getDefaultValueForVariable(newVariable)
    });
    onUpdate(updatedCondition, index);
  }

  handleOperatorChange(e) {
    const { condition, index, onUpdate } = this.props;
    const updatedCondition = assign({}, condition, { operator: e.target.value });
    onUpdate(updatedCondition, index);
  }

  handleValueChange(e) {
    const { condition, index, onUpdate } = this.props;
    const newValue = this.getValueFromElement(e.target);
    const updatedCondition = assign({}, condition, { value: newValue });
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
    const { condition: { operator } } = this.props;
    const operators = this.getCurrentVariable().operator;

    return (
      <select className="operator" value={operator} onChange={this.handleOperatorChange}>
        {operators.map(this.renderOperatorOption)}
      </select>
    );
  }

  renderOperatorOption(operator) {
    return (
      <option key={operator.name} value={operator.name}>{operator.label}</option>
    );
  }

  renderValueElement() {
    const fieldType = this.getCurrentVariable().field_type;

    switch (fieldType) {
      case 'text':
        return this.renderTextValueInput();
      case 'numeric':
        return this.renderNumericValueInput();
      case 'select':
        return this.renderValueSelect(false);
      case 'select_multiple':
        return this.renderValueSelect(true);
      default:
        return (
          <input className="value" type="hidden" />
        );
    }
  }

  renderTextValueInput() {
    return (
      <input
        className="value textInput"
        onChange={this.handleValueChange}
        type="text"
        value={this.props.condition.value}
      />
    );
  }

  renderNumericValueInput() {
    return (
      <input
        className="value numberInput"
        onChange={this.handleValueChange}
        type="text"
        value={this.props.condition.value}
      />
    );
  }

  renderValueSelect(isMultiple) {
    const { condition: { value } } = this.props;
    return (
      <select
        multiple={isMultiple}
        className="value"
        onChange={this.handleValueChange}
        value={value}
      >
        {this.getCurrentVariable().options.map(this.renderValueOption)}
      </select>
    );
  }

  renderValueOption(option) {
    return (
      <option key={option} value={option}>{option}</option>
    );
  }

  render() {
    return (
      <div className="rule">
        {this.renderVariableSelect()}
        {this.renderOperatorSelect()}
        {this.renderValueElement()}
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
