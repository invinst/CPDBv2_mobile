import React from 'react';
import SimpleEventSystem from 'components/Lib/SimpleEventSystem';


// This component use its own event system, which allow the other component to send message to itself
// Since it used `SimpleEventSystem`, we assumed that there's no event to be dispatched at the same time
const Modal = React.createClass({
  propTypes: {
    'name': React.PropTypes.string,
    'children': React.PropTypes.node
  },

  childContextTypes: {
    modalName: React.PropTypes.string,
    action: React.PropTypes.func
  },

  getInitialState() {
    return {
      'open': 0
    };
  },

  getChildContext() {
    return {
      modalName: this.props.name,
      action: Modal.dispatchFor(this.props.name)
    };
  },

  componentDidMount() {
    Modal.eventSystem.register(this.props.name, this.handleEvent);
  },

  componentWillUnmount() {
    Modal.eventSystem.unregister(this.props.name);
  },

  supportedActions: ['open', 'close'],

  handleEvent(event) {
    if (this.supportedActions.indexOf(event) > -1) {
      this.setState({
        'open': event == 'open' ? 1 : 0
      });
    }
  },

  openModal() {

    this.handleEvent('open');
  },

  closeModal() {
    this.handleEvent('close');
  },

  render() {
    if (this.state.open) {
      return (
        <div>
          { this.props.children }
        </div>
      );
    }

    return (
      <div></div>
    );
  }
});

Modal.eventSystem = SimpleEventSystem();

Modal.dispatch = (target, event) => () => {
  Modal.eventSystem.dispatch(target, event);
};

Modal.dispatchFor = target => event => Modal.dispatch(target, event);

export default Modal;
