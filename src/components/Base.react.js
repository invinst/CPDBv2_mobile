/*eslint react/no-is-mounted:0*/
const Base = (Store, name) => ({
  displayName: name || 'TightlyStoreCoupledComponent',

  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState(Store.getState());
    }
  }
});

export default Base;
