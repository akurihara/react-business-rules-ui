import expect from 'expect';
import React from 'react';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import Action from '../src/Action';
import ActionsFixtures from './fixtures/actions';
import ActionDefinitionsFixtures from './fixtures/action_definitions';

describe('Action', () => {
  let component;
  let onRemoveSpy;
  let onUpdateSpy;
  const index = 1;
  const { numericAction, selectAction, textAction } = ActionsFixtures;
  const { actionDefinitions } = ActionDefinitionsFixtures;

  beforeEach(() => {
    onRemoveSpy = sinon.spy();
    onUpdateSpy = sinon.spy();
    component = renderIntoDocument(
      <Action
        action={numericAction}
        actionDefinitions={actionDefinitions}
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
    expect(select.value).toEqual('order_more');
  });

  it('calls onUpdate when a new action is selected', () => {
    const select = findDOMNode(component).querySelector('select.action-select');

    Simulate.change(select, { target: { value: 'send_email' } });

    const expectedAction = {
      name: 'send_email',
      params: { email: '' }
    };
    expect(onUpdateSpy.calledWith(expectedAction, index)).toBe(true);
  });

  it('renders a select input with an option for each available action', () => {
    const select = findDOMNode(component).querySelector('select.action-select');
    expect(select).toExist();

    expect(select.options.length).toEqual(actionDefinitions.length);
    for (let i = 0; i < actionDefinitions.length; i++) {
      expect(select.options[i].value).toEqual(actionDefinitions[i].name);
    }
  });

  it('calls onUpdate when a new value is entered', () => {
    const input = findDOMNode(component).querySelector('div.field input');
    const newValue = 2;
    const event = {
      target: {
        name: 'number_to_order',
        value: newValue,
      }
    };

    Simulate.change(input, event);

    const expectedAction = {
      name: 'order_more',
      params: { number_to_order: newValue }
    };
    expect(onUpdateSpy.calledWith(expectedAction, index)).toBe(true);
  });

  it('renders a label for a parameter', () => {
    const actionNode = findDOMNode(component);

    const label = actionNode.querySelector('div.field label');
    expect(label.textContent).toEqual('number_to_order');
  });

  describe('renders expected input type and value', () => {
    it('for a numeric parameter', () => {
      component = renderIntoDocument(
        <Action
          action={numericAction}
          actionDefinitions={actionDefinitions}
          index={index}
          onRemove={onRemoveSpy}
          onUpdate={onUpdateSpy}
        />);
      const actionNode = findDOMNode(component);

      const label = actionNode.querySelector('div.field label');
      expect(actionNode.className).toInclude('action');
      expect(label.textContent).toEqual('number_to_order');

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
          actionDefinitions={actionDefinitions}
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
          actionDefinitions={actionDefinitions}
          index={index}
          onRemove={onRemoveSpy}
          onUpdate={onUpdateSpy}
        />);
      const select = findDOMNode(component).querySelector('.field select');
      const { className, value } = select;

      expect(className).toInclude('select');
      expect(value).toEqual(selectAction.params.genre);

      const actionDefinition = actionDefinitions[3];
      const options = select.querySelectorAll('option');
      for (let i = 0; i < actionDefinition.params[0].options.length; i++) {
        expect(options[i].value).toEqual(actionDefinition.params[0].options[i]);
      }
    });
  });
});
