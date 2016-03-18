import React, { Component, PropTypes } from 'react';
import Rule, { getDefaultValueForVariable } from './Rule';
import { includes } from 'lodash';

class Conditional extends Component {

  constructor(props) {
    super(props);
    this.handleAddChildRule = this.handleAddChildRule.bind(this);
    this.handleAddChildConditional = this.handleAddChildConditional.bind(this);
    this.handleRemoveChildCondition = this.handleRemoveChildCondition.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSelectChange(e) {
    const { conditions, index, onUpdate } = this.props;
    onUpdate({ [e.target.value]: conditions }, index);
  }

  handleUpdate(updatedCondition, updatedIndex) {
    const { conditions, onUpdate, type } = this.props;
    const newConditions = conditions.map((condition, index) =>
      updatedIndex === index ? updatedCondition : condition
    );
    onUpdate({ [type]: newConditions }, this.props.index);
  }

  handleAddChildRule(e) {
    e.preventDefault();
    const { conditions, index, onUpdate, type, variables } = this.props;
    const newConditions = [...conditions, {
      name: variables[0].name,
      operator: variables[0].operator[0].name,
      value: getDefaultValueForVariable(variables[0])
    }];
    onUpdate({ [type]: newConditions }, index);
  }

  handleAddChildConditional(e) {
    e.preventDefault();
    const { conditions, index, onUpdate, type, variables } = this.props;
    const newConditions = [...conditions, {
      all: [
        {
          name: variables[0].name,
          operator: variables[0].operator[0].name
        }
      ]
    }];
    onUpdate({ [type]: newConditions }, index);
  }

  handleRemoveChildCondition(removedIndex) {
    const { conditions, onUpdate, type } = this.props;
    const newConditions = conditions.filter((condition, index) => index !== removedIndex);
    onUpdate({ [type]: newConditions }, this.props.index);
  }

  handleRemoveClick() {
    const { index, onRemove } = this.props;
    onRemove(index);
  }

  isConditionASubCondition(condition) {
    const type = Object.keys(condition)[0];
    return includes(['all', 'any'], type);
  }

  renderConditions() {
    const { conditions } = this.props;
    return conditions.map(this.renderCondition.bind(this));
  }

  renderCondition(condition, index) {
    if ( this.isConditionASubCondition(condition) ) {
      return this.renderSubCondition(condition, index);
    }
    return this.renderRule(condition, index);
  }

  renderRule(condition, index) {
    return (
      <Rule
        condition={condition}
        index={index}
        onRemove={this.handleRemoveChildCondition}
        onUpdate={this.handleUpdate}
        variables={this.props.variables}
      />
    );
  }

  renderSubCondition(subCondition, index) {
    const type = Object.keys(subCondition)[0];
    return (
      <Conditional
        index={index}
        conditions={subCondition[type]}
        onRemove={this.handleRemoveChildCondition}
        onUpdate={this.handleUpdate}
        type={type}
        variables={this.props.variables}
      />
    );
  }

  renderRemove() {
    const { canBeRemoved } = this.props;
    if ( canBeRemoved ) {
      return (
        <a className="remove" href="#" onClick={this.handleRemoveClick}>
          Remove This Sub-Condition
        </a>
      );
    }
  }

  render() {
    return (
      <div className="conditional">
        <div className="all-any-wrapper">
          <select
            className="all-any"
            value={this.props.type}
            onChange={this.handleSelectChange}
          >
            <option value="all">All</option>
            <option value="any">Any</option>
          </select>
          <h4>of the following conditions:</h4>
        </div>
        <a href="#" className="add-rule" onClick={this.handleAddChildRule}>
          Add Condition
        </a>
        <a href="#" className="add-condition" onClick={this.handleAddChildConditional}>
          Add Sub-Condition
        </a>
        {this.renderRemove()}
        {this.renderConditions()}
      </div>
    );
  }
}

Conditional.propTypes = {
  canBeRemoved: PropTypes.bool,
  conditions: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['all', 'any']).isRequired,
  variables: PropTypes.array.isRequired
};

Conditional.defaultProps = {
  canBeRemoved: true
};

export default Conditional;
