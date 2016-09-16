import React from 'react';
import 'cx';

const MediaCard = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },

  render() {
    const { item } = this.props;
    const presenter = MediaPresenter(item);
    const iconClassName = cx('media-icon', u.format('{type}-icon', { type: presenter.type }));

    return (
      <div className='media-card row'>
        <a href={ presenter.url } target='_blank'>
          <div className='one column icon-wrapper center'>
            <div className={ iconClassName }></div>
          </div>
          <div className='eleven columns'>
            <div className='media-detail column align-left'>
              <div className='media-title'>{ presenter.title }</div>
            </div>
          </div>
        </a>
      </div>
    );
  }

});

export default MediaCard;
