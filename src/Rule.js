import React, { Component, PropTypes } from 'react';

class Rule extends Component {

  render() {
    return (
      <div className="rule">
        Rule
      </div>
    );
  }
}

Rule.propTypes = {
  name: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ])
};

export default Rule;
