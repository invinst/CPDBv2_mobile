import React from 'react';
import OfficerPresenter from 'presenters/OfficerPresenter';
import style from 'styles/OfficerPage/OfficerHeader.sass';


const OfficerHeader = React.createClass({
  propTypes: {
    officer: React.PropTypes.object
  },

  render() {
    const officerPresenter = OfficerPresenter(this.props.officer);

    return (
      <div className={ style.officerHeader }>
        <div className='pad'>
          <div className='badge-info'>
            <span className='badge-label'>Badge &nbsp;</span>
            <span className='badge-value'>{ officerPresenter.badge }</span>
          </div>
          <div className='name'>{ officerPresenter.displayName }</div>
        </div>
      </div>
    );
  }
});

export default OfficerHeader;
