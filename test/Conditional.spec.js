import expect from 'expect';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import Conditional from '../src/Conditional';

describe('Conditional', () => {

  it('should render with default props', () => {
    const conditional = renderIntoDocument(<Conditional />);
    expect(conditional).toExist();
    expect(conditional.props.type).toEqual('all');
  });
});
