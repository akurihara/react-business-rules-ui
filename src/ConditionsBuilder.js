import React, { Component, PropTypes } from 'react';
import Conditional from './Conditional';
import { assign } from 'lodash';

class ConditionsBuilder extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(conditions) {
    this.props.onUpdate(conditions);
  }

  denormalizeVariableOperators() {
    const { operators, variables } = this.props;
    return variables.map((variable) => {
      const operator = operators[variable.field_type];
      const newVariable = assign({}, variable, { operator });
      return newVariable;
    });
  }

  render() {
    const { conditions } = this.props;
    const type = Object.keys(conditions)[0];
    const variables = this.denormalizeVariableOperators();

    return (
      <div id="conditions">
        <Conditional
          canBeRemoved={false}
          conditions={conditions[type]}
          index={0}
          onUpdate={this.handleUpdate}
          type={type}
          variables={variables}
        />
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
        input_type: PropTypes.string
      })
    )
  ),
  conditions: PropTypes.object,
  onUpdate: PropTypes.func,
  variables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      field_type: PropTypes.string,
      options: PropTypes.array
    })
  ),
};

export default ConditionsBuilder;
