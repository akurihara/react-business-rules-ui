import React, { Component, PropTypes } from 'react';
import Conditional from './Conditional';
import Rule from './Rule';

class Conditional extends Component {

  isConditionASubCondition(condition) {
    return condition.all || condition.any;
  }

  renderConditions() {
    const { conditions } = this.props;
    return conditions.map(this.renderCondition);
  }

  renderCondition(condition) {
    if ( this.isConditionSubCondition(condition) ) {
      return this.renderSubCondition(condition);
    } else {
      reutrn this.renderRule(condition);
    }
  }

  renderRule(rule) {
    return (
      <Rule props={...rule} />
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
        <div className="all-any-wrapper">All</div>
        <a href="#" className="add-rule">Add Condition</a>
        <a href="#" className="add-condition">Add Sub-Condition</a>
        {this.renderConditions()}
      </div>
    );
  }
}

Conditional.propTypes = {
  conditions: PropTypes.array
  type: PropTypes.onOf(['all', 'any']),
};

Conditional.defaultProps = {
  conditions: []
  type: 'all',
};

export default Conditional;
