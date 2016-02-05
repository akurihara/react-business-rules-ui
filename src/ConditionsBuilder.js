import React, { Component, PropTypes } from 'react';
import Conditional from './Conditional';

class ConditionsBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.rules;
  }

  render() {
    const { rules } = this.props;
    const type = Object.keys(rules)[0];

    return (
      <div className="conditions">
        <Conditional type={type} conditions={rules[type]} />
      </div>
    );
  }
}

ConditionsBuilder.propTypes = {
  operators: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        label: PropTypes.string,
        inputType: PropTypes.string
      })
    )
  ),
  rules: PropTypes.object,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      fieldType: PropTypes.string,
      options: PropTypes.array
    })
  ),
};

ConditionsBuilder.defaultProps = {
  rules: { all: [] }
};

export default ConditionsBuilder;
