import React, { Component, PropTypes } from 'react';

class Rule extends Component {

  render() {
    const { name, operator } = this.props;

    return (
      <div className="rule">
        <select className="field" value={name}>
          <option value={name}>{name}</option>
        </select>
        <select className="operator" value={operator}>
          <option value={operator}>{operator}</option>
        </select>
        <input type="text" className="value numberInput" />
        <a className="Remove" href="#">Remove</a>
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
