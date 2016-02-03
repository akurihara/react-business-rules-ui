import React, { Component, PropTypes } from 'react';

class ConditionsBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.rules;
  }

  render() {
    return (
      <div className="conditions">
        Conditions
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
        inputType: ProptTypes.string
      })
    )
  ).isRequired,
  rules: PropTypes.object,
  variables: PropTypes.arrayOf(
    PropsTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      fieldType: PropTypes.string,
      options: PropTypes.array
    })
  ).isRequired,
};

ConditionsBuilder.defaultProps = {
  rules: { all: [] }
};

export default ConditionsBuilder;
