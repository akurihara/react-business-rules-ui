import React, { Component, PropTypes } from 'react';
import Rule from './Rule';
import { includes } from 'lodash';

class Conditional extends Component {

  constructor(props) {
    super(props);
    this.handleAddCondition = this.handleAddCondition.bind(this);
    this.handleAddSubCondition = this.handleAddSubCondition.bind(this);
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

  handleAddCondition(e) {
    e.preventDefault();
    const { conditions, index, onUpdate, type, variables } = this.props;
    const newConditions = [...conditions, {
      name: variables[0].name,
      operator: variables[0].operator[0].name
    }];
    onUpdate({ [type]: newConditions }, index);
  }

  handleAddSubCondition(e) {
    e.preventDefault();
    const { conditions, index, onUpdate, type, variables } = this.props;
    const newConditions = [...conditions, {
      all: [
        {
          name: variables[0].name,
          operator: variables[0].operator
        }
      ]
    }];
    onUpdate({ [type]: newConditions }, index);
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
        onUpdate={this.handleUpdate}
        type={type}
        variables={this.props.variables}
      />
    );
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
        <a href="#" className="add-rule" onClick={this.handleAddCondition}>
          Add Condition
        </a>
        <a href="#" className="add-condition" onClick={this.handleAddSubCondition}>
          Add Sub-Condition
        </a>
        {this.renderConditions()}
      </div>
    );
  }
}

Conditional.propTypes = {
  conditions: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['all', 'any']).isRequired,
  variables: PropTypes.array.isRequired
};

export default Conditional;
