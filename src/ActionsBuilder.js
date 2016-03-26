import React, { Component, PropTypes } from 'react';
import Action from './Action';

class ActionsBuilder extends Component {

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAddAction = this.handleAddAction.bind(this);
    this.handleUpdateAction = this.handleUpdateAction.bind(this);
    this.handleRemoveAction = this.handleRemoveAction.bind(this);
  }

  getDefaultAction() {
    const { actionDefinitions } = this.props;
    return {
      name: actionDefinitions[0].name,
      params: Action.getDefaultParametersForAction(actionDefinitions[0])
    };
  }

  handleUpdate(actions) {
    this.props.onUpdate(actions);
  }

  handleAddAction(e) {
    e.preventDefault();
    const { actions, onUpdate } = this.props;
    const newActions = [...actions, this.getDefaultAction()];
    onUpdate(newActions);
  }

  handleUpdateAction(updatedAction, updatedIndex) {
    const { actions, onUpdate } = this.props;
    const newActions = actions.map((action, index) =>
      updatedIndex === index ? updatedAction : action
    );
    onUpdate(newActions);
  }

  handleRemoveAction(removedIndex) {
    const { actions, onUpdate } = this.props;
    const newActions = actions.filter((action, index) => index !== removedIndex);
    onUpdate(newActions);
  }

  renderConditions() {
    const { actions } = this.props;
    return actions.map(this.renderAction.bind(this));
  }

  renderAction(action, index) {
    return (
      <Action
        action={action}
        actionDefinitions={this.props.actionDefinitions}
        index={index}
        key={index}
        onRemove={this.handleRemoveAction}
        onUpdate={this.handleUpdateAction}
      />
    );
  }

  render() {
    return (
      <div id="actions">
        <div className="actions">
          <div className="action-buttons">
            <a href="#" className="add" onClick={this.handleAddAction}>
              Add Action
            </a>
          </div>
          {this.renderConditions()}
        </div>
      </div>
    );
  }
}

ActionsBuilder.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      params: PropTypes.object
    })
  ),
  actionDefinitions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      params: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          label: PropTypes.string,
          fieldType: PropTypes.string,
          options: PropTypes.array
        })
      )
    })
  ),
  onUpdate: PropTypes.func
};

export default ActionsBuilder;
