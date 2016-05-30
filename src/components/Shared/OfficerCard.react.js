import React from 'react';
import cx from 'classnames';
import HelperUtil from 'utils/HelperUtil';
import OfficerUtil from 'utils/OfficerUtil';


const OfficerCard = React.createClass({
  propTypes: {
    officerId: React.PropTypes.string,
    allegationsCount: React.PropTypes.number,
    displayName: React.PropTypes.string,
    description: React.PropTypes.string
  },

  render() {
    // FIXME: Make this component to be more general that we could use it in better way later
    const officerClassname = HelperUtil.format('officer-{id}', {'id': this.props.officerId});
    const classNames = cx('officer-card pad', officerClassname);
    const circleClassNames = cx('circle', OfficerUtil.getColorLevelClass('circle', this.props.allegationsCount));

    return (
      <div className={ classNames }>
        <div className='row'>
          <div className='one column circle-wrapper center'>
            <div className={ circleClassNames }></div>
          </div>
          <div className='eleven columns'>
            <div className='officer'>
              <div className='name bold'>{ this.props.displayName }</div>
              <div className='description'>{ this.props.description }</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default OfficerCard;
