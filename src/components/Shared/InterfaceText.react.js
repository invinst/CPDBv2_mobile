import cx from 'classnames';
import objectAssign from 'object-assign';
import React from 'react';
import S from 'string';
import Base from 'components/Base.react';
import u from 'utils/HelperUtil';
import InterfaceTextStore from 'stores/Shared/InterfaceTextStore';
import InterfaceTextResourceUtil from 'utils/InterfaceTextResourceUtil';
import InterfaceTextUtil from 'utils/InterfaceTextUtil';
import style from 'styles/Shared/InterfaceText.sass';


const InterfaceText = React.createClass(objectAssign(Base(InterfaceTextStore), {
  propsTypes: {
    'identifier': React.PropTypes.string,
    'placeholderLength': React.PropTypes.number
  },

  getInitialState() {
    return {
      loaded: InterfaceTextUtil.isCached('interfaceTexts'),
      interfaceTexts: InterfaceTextUtil.getLocalStorageItem('interfaceTexts')
    };
  },

  componentDidMount() {
    InterfaceTextStore.addChangeListener(this._onChange);
    if (!this.state.loaded) {
      InterfaceTextResourceUtil.get();
    }
  },

  render() {
    const placeholderLength = u.fetch(this.props, 'placeholderLength', 1);
    const identifier = u.fetch(this.props, 'identifier', '');
    const haveInterfaceText = !!this.state.interfaceTexts && (identifier in this.state.interfaceTexts);
    const text = u.fetch(this.state.interfaceTexts, identifier, S('x').repeat(+placeholderLength).s);
    const classNames = cx(style.interfaceText, {
      'blurry-text': !this.state.loaded || !haveInterfaceText
    });

    return (
      <div className={ classNames }>
        { text }
      </div>
    );
  }
}));

export default InterfaceText;
