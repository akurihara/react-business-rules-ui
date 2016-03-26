import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { assign } from 'lodash';

class Action extends Component {

  constructor(props) {
    super(props);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  static getDefaultValueForParameter(parameter) {
    switch (parameter.fieldType) {
      case 'text':
        return '';
      case 'numeric':
        return 0;
      case 'select':
        return parameter.options[0];
      default:
        return null;
    }
  }

  static getDefaultParametersForAction(action) {
    const params = {};
    for (let i = 0; i < action.params.length; i++) {
      const parameter = action.params[i];
      params[parameter.name] = Action.getDefaultValueForParameter(parameter);
    }
    return params;
  }

  getActionDefinitionByName(name) {
    const { actionDefinitions } = this.props;
    return actionDefinitions.filter(action => action.name === name)[0];
  }

  getCurrentActionDefinition() {
    const { action: { name } } = this.props;
    return this.getActionDefinitionByName(name);
  }

  getParameterByName(name) {
    const action = this.getCurrentActionDefinition();
    return action.params.filter(param => param.name === name)[0];
  }

  handleActionChange(e) {
    const { index, onUpdate } = this.props;
    const action = this.getActionDefinitionByName(e.target.value);

    const newAction = {
      name: action.name,
      params: Action.getDefaultParametersForAction(action)
    };
    onUpdate(newAction, index);
  }

  handleRemove() {
    const { index, onRemove } = this.props;
    onRemove(index);
  }

  handleParameterChange(e) {
    const { action, index, onUpdate } = this.props;
    const { target: { name, value } } = e;
    const isNumeric = this.getParameterByName(name).fieldType === 'numeric';
    const updatedParams = assign({}, action.params, {
      [name]: isNumeric ? Number(value) : value
    });
    const updatedAction = assign({}, action, { params: updatedParams });
    onUpdate(updatedAction, index);
  }

  renderActionSelect() {
    const { action: { name }, actionDefinitions } = this.props;

    return (
      <select
        className="action-select"
        name="action-select"
        value={name}
        onChange={this.handleActionChange}
      >
        {actionDefinitions.map(this.renderActionOption)}
      </select>
    );
  }

  renderActionOption(action) {
    return (
      <option key={action.name} value={action.name}>{action.label}</option>
    );
  }

  renderParameters() {
    const { action: { params } } = this.props;
    return (
      <div className="subfields">
        {Object.keys(params).map(this.renderParameter.bind(this))}
      </div>
    );
  }

  renderParameter(name) {
    const { action: { params } } = this.props;

    return (
      <div key={name} className="field">
        <label>{name}</label>
        {this.renderParameterField(name, params[name])}
      </div>
    );
  }

  renderParameterField(name, value) {
    const parameter = this.getParameterByName(name);

    switch (parameter.fieldType) {
      case 'text':
        return this.renderTextParameterInput(value, name);
      case 'numeric':
        return this.renderNumericParameterInput(value, name);
      case 'select':
        return this.renderParameterSelect(value, name);
      default:
        return null;
    }
  }

  renderTextParameterInput(value, name) {
    return (
      <input
        className="text"
        name={name}
        onChange={this.handleParameterChange}
        type="text"
        value={value}
      />
    );
  }

  renderNumericParameterInput(value, name) {
    return (
      <input
        className="numeric"
        name={name}
        onChange={this.handleParameterChange}
        type="number"
        value={value}
      />
    );
  }

  renderParameterSelect(value, name) {
    return (
      <select
        className="select"
        name={name}
        onChange={this.handleParameterChange}
        value={value}
      >
        {this.getParameterByName(name).options.map(this.renderParameterOption)}
      </select>
    );
  }

  renderParameterOption(option) {
    return (
      <option key={option} value={option}>{option}</option>
    );
  }

  render() {
    const classes = classNames('action', this.props.action.name);

    return (
      <div className={classes} >
        {this.renderActionSelect()}
        {this.renderParameters()}
        <a className="remove" href="#" onClick={this.handleRemove}>
          Remove Action
        </a>
      </div>
    );
  }
}

Action.propTypes = {
  action: PropTypes.shape({
    name: PropTypes.string,
    params: PropTypes.object
  }),
  actionDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      params: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          label: PropTypes.string,
          fieldType: PropTypes.string,
          options: PropTypes.array
        })
      )
    })
  ),
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func
};

export default Action;
