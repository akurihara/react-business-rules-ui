import expect from 'expect';
import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import Conditional from '../src/Conditional';

describe('Conditional', () => {
  it('should render', () => {
    const props = {
      conditions: [],
      index: 0,
      onUpdate: () => undefined,
      type: 'all',
      variables: []
    };
    const conditional = renderIntoDocument(<Conditional {...props} />);

    expect(conditional).toExist();
  });
});
