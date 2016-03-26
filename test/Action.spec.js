import expect from 'expect';
import React from 'react';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import Action from '../src/Action';
import ActionsFixtures from './fixtures/actions';
import AvailableActionsFixtures from './fixtures/available_actions';

describe('Action', () => {
  let component;
  let onRemoveSpy;
  let onUpdateSpy;
  const index = 1;
  const { numericAction, selectAction, textAction } = ActionsFixtures;
  const { availableActions } = AvailableActionsFixtures;

  beforeEach(() => {
    onRemoveSpy = sinon.spy();
    onUpdateSpy = sinon.spy();
    component = renderIntoDocument(
      <Action
        action={numericAction}
        availableActions={availableActions}
        index={index}
        onRemove={onRemoveSpy}
        onUpdate={onUpdateSpy}
      />);
  });

  it('renders an action element', () => {
    const actionNode = findDOMNode(component);
    expect(actionNode).toExist();
    expect(actionNode.className).toInclude('action');
  });

  it('renders a remove link', () => {
    const removeLink = findDOMNode(component).querySelector('a.remove');
    expect(removeLink).toExist();
  });

  it('calls onRemove when the remove link is clicked', () => {
    const removeLink = findDOMNode(component).querySelector('a.remove');
    Simulate.click(removeLink);
    expect(onRemoveSpy.calledWith(index)).toBe(true);
  });

  it('renders a select input set to the current action', () => {
    const select = findDOMNode(component).querySelector('select.action-select');
    expect(select).toExist();
    expect(select.value).toEqual(numericAction.name);
  });

  it('calls onUpdate when a new action is selected', () => {
    const select = findDOMNode(component).querySelector('select.action-select');
    const newAction = availableActions[2];

    Simulate.change(select, { target: { value: newAction.name } });

    const expectedAction = {
      name: newAction.name,
      params: { [newAction.params[0].name]: '' }
    };
    expect(onUpdateSpy.calledWith(expectedAction, index)).toBe(true);
  });

  it('renders a select input with an option for each available action', () => {
    const select = findDOMNode(component).querySelector('select.action-select');
    expect(select).toExist();

    expect(select.options.length).toEqual(availableActions.length);
    for (let i = 0; i < availableActions.length; i++) {
      expect(select.options[i].value).toEqual(availableActions[i].name);
    }
  });

  it('calls onUpdate when a new value is entered', () => {
    const input = findDOMNode(component).querySelector('div.field input');
    const currentAction = component.getCurrentAction();
    const newValue = 2;
    const event = {
      target: {
        name: currentAction.params[0].name,
        value: newValue,
      }
    };

    Simulate.change(input, event);

    const expectedAction = {
      name: currentAction.name,
      params: { [currentAction.params[0].name]: newValue }
    };
    expect(onUpdateSpy.calledWith(expectedAction, index)).toBe(true);
  });

  it('renders a label for a parameter', () => {
    const currentAction = component.getCurrentAction();
    const actionNode = findDOMNode(component);

    const label = actionNode.querySelector('div.field label');
    expect(label.textContent).toEqual(currentAction.params[0].name);
  });

  describe('renders expected input type and value', () => {
    it('for a numeric parameter', () => {
      component = renderIntoDocument(
        <Action
          action={numericAction}
          availableActions={availableActions}
          index={index}
          onRemove={onRemoveSpy}
          onUpdate={onUpdateSpy}
        />);
      const currentAction = component.getCurrentAction();
      const actionNode = findDOMNode(component);

      const label = actionNode.querySelector('div.field label');
      expect(actionNode.className).toInclude('action');
      expect(label.textContent).toEqual(currentAction.params[0].name);

      const input = actionNode.querySelector('div.field input');
      const { className, type, value } = input;
      expect(type).toEqual('number');
      expect(className).toInclude('numeric');
      expect(Number(value)).toEqual(numericAction.params.number_to_order);
    });

    it('for a text parameter', () => {
      component = renderIntoDocument(
        <Action
          action={textAction}
          availableActions={availableActions}
          index={index}
          onRemove={onRemoveSpy}
          onUpdate={onUpdateSpy}
        />);
      const input = findDOMNode(component).querySelector('.field input');
      const { className, type, value } = input;

      expect(type).toEqual('text');
      expect(className).toInclude('text');
      expect(value).toEqual(textAction.params.email);
    });

    it('for a select parameter', () => {
      component = renderIntoDocument(
        <Action
          action={selectAction}
          availableActions={availableActions}
          index={index}
          onRemove={onRemoveSpy}
          onUpdate={onUpdateSpy}
        />);
      const select = findDOMNode(component).querySelector('.field select');
      const { className, value } = select;

      expect(className).toInclude('select');
      expect(value).toEqual(selectAction.params.genre);

      const currentAction = component.getCurrentAction();
      const options = select.querySelectorAll('option');
      for (let i = 0; i < currentAction.params[0].options.length; i++) {
        expect(options[i].value).toEqual(currentAction.params[0].options[i]);
      }
    });
  });
});
