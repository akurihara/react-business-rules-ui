import React, { Component, PropTypes } from 'react';

class ActionsBuilder extends Component {

  render() {
    return (
      <div id="actions">
        Actions
      </div>
    );
  }
}

ActionsBuilder.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      params: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          label: PropTypes.string,
          fieldType: PropTypes.string
        })
      )
    })
  ),
};

export default ActionsBuilder;
