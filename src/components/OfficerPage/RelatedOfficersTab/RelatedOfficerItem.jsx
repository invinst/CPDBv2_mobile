import React from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';
import AppHistory from 'utils/History';
import OfficerPresenter from 'presenters/OfficerPresenter';
import OfficerUtil from 'utils/OfficerUtil';
import HelperUtil from 'utils/HelperUtil';
import style from 'styles/OfficerPage/RelatedOfficersTab/RelatedOfficerItem.sass';


const RelatedOfficerItem = React.createClass({
  propTypes: {
    officer: React.PropTypes.object,
    type: React.PropTypes.string
  },

  onClick() {
    const officer = this.props.officer;
    const presenter = OfficerPresenter(officer);
    AppHistory.push(presenter.url);
    // TODO: Fix bug when click moving from `OfficerPage` to another `OfficerPage`
  },

  render() {
    const type = this.props.type;
    const officer = this.props.officer;

    const numberOfAllegations = officer['num_allegations'];
    const presenter = OfficerPresenter(officer);
    const relatedOfficerClassName = cx(style.relatedOfficerItem,
      HelperUtil.format('officer-{index}', { 'index': presenter.id })
    );

    return (
      <div className={ relatedOfficerClassName } onClick={ this.onClick }>
        <div className='row'>
          <div className='one column circle-wrapper center'>
            <span className={ cx('circle', OfficerUtil.getColorLevelClass('circle', presenter.allegationsCount)) } />
          </div>
          <div className='eleven columns'>
            <div className='name bold'>{ presenter.displayName }</div>
            <div className='officer-description'>{ presenter.description }</div>
            <div className='related-description'>{ type } in { pluralize('case', numberOfAllegations, true) }</div>
          </div>
        </div>
      </div>
    );
  }
});

RelatedOfficerItem.defaultProps = {
  officer: {},
  type: ''
};

export default RelatedOfficerItem;
