import React, { Component, PropTypes } from 'react';
import Rule from './Rule';

class Conditional extends Component {

  isConditionASubCondition(condition) {
    const type = Object.keys(condition)[0];
    return type === 'all' || type === 'any';
  }

  renderConditions() {
    const { conditions } = this.props;
    return conditions.map(this.renderCondition.bind(this));
  }

  renderCondition(condition) {
    if ( this.isConditionASubCondition(condition) ) {
      return this.renderSubCondition(condition);
    }
    return this.renderRule(condition);
  }

  renderRule(rule) {
    return (
      <Rule {...rule} />
    );
  }

  renderSubCondition(subCondition) {
    const type = Object.keys(subCondition)[0];
    return (
      <Conditional type={type} conditions={subCondition[type]} />
    );
  }

  render() {
    return (
      <div className="conditional">
        <div className="all-any-wrapper">
          <select className="all-any">
            <option value="all">All</option>
            <option value="any">Any</option>
          </select>
          <h4>of the following conditions:</h4>
        </div>
        <a href="#" className="add-rule">Add Condition</a>
        <a href="#" className="add-condition">Add Sub-Condition</a>
        {this.renderConditions()}
      </div>
    );
  }
}

Conditional.propTypes = {
  conditions: PropTypes.array,
  type: PropTypes.oneOf(['all', 'any'])
};

Conditional.defaultProps = {
  conditions: [],
  type: 'all'
};

export default Conditional;
