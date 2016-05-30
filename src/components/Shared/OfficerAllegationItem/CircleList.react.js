import React from 'react';
import cx from 'classnames';
import u from 'utils/HelperUtil';
import OfficerUtil from 'utils/OfficerUtil';


const CircleList = React.createClass({
  propTypes: {
    allegationCountList: React.PropTypes.array
  },

  renderCircle(count, index) {
    return (
      <div className={ cx('circle-wrapper', u.format('officer-{index}', {'index': index})) } key={ index }>
        <span className={ cx('circle', OfficerUtil.getColorLevelClass('circle', count)) }/>
      </div>
    );
  },

  render() {
    const allegationCountList = u.fetch(this.props, 'allegationCountList', []).sort((a, b) => b - a);

    return (
      <div>
        { allegationCountList.map(this.renderCircle) }
      </div>
    );
  }
});

export default CircleList;
