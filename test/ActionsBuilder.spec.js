import expect from 'expect';
import React from 'react';
import {
  renderIntoDocument,
  Simulate,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import Action from '../src/Action';
import ActionsBuilder from '../src/ActionsBuilder';
import ActionsFixtures from './fixtures/actions';
import ActionDefinitionsFixtures from './fixtures/action_definitions';

describe('ActionsBuilder', () => {
  let component;
  let onUpdateSpy;
  const { actionDefinitions } = ActionDefinitionsFixtures;
  const { numericAction, selectAction, textAction } = ActionsFixtures;
  const initialActions = [numericAction, textAction, selectAction];

  beforeEach(() => {
    onUpdateSpy = sinon.spy();
    component = renderIntoDocument(
      <ActionsBuilder
        actions={initialActions}
        actionDefinitions={actionDefinitions}
        onUpdate={onUpdateSpy}
      />);
  });

  it('renders an actions builder element', () => {
    const actionsBuilderNode = findDOMNode(component);
    expect(actionsBuilderNode).toExist();
    expect(actionsBuilderNode.id).toEqual('actions');
  });

  it('renders an Action component for each action prop', () => {
    const actions = scryRenderedComponentsWithType(component, Action);
    expect(actions.length).toEqual(initialActions.length);
  });

  it('renders an add action link', () => {
    const addActionLink = findDOMNode(component).querySelector('a.add');
    expect(addActionLink).toExist();
  });

  it('calls onUpdate when the add action link is clicked', () => {
    const addActionLink = findDOMNode(component).querySelector('a.add');
    Simulate.click(addActionLink);

    expect(onUpdateSpy.calledOnce).toBe(true);
    const updatedActions = onUpdateSpy.firstCall.args[0];
    expect(updatedActions.length).toEqual(initialActions.length + 1);
  });

  it('calls onUpdate when an action is removed', () => {
    const firstAction = scryRenderedComponentsWithType(component, Action)[0];
    const removeLink = findDOMNode(firstAction).querySelector('a.remove');
    Simulate.click(removeLink);

    expect(onUpdateSpy.calledOnce).toBe(true);
    const updatedActions = onUpdateSpy.firstCall.args[0];
    expect(updatedActions.length).toEqual(initialActions.length - 1);
  });

  it('calls onUpdate when an action is changed', () => {
    const firstAction = scryRenderedComponentsWithType(component, Action)[0];
    const select = findDOMNode(firstAction).querySelector('.action-select');

    Simulate.change(select, { target: { value: 'put_on_sale' } });

    expect(onUpdateSpy.calledOnce).toBe(true);
    const updatedActions = onUpdateSpy.firstCall.args[0];
    const expectedAction = {
      name: 'put_on_sale',
      params: {}
    };
    expect(updatedActions.length).toEqual(initialActions.length);
    expect(updatedActions[0]).toEqual(expectedAction);
  });
});
