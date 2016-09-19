import React from 'react';

import Wrapper from 'components/Shared/Wrapper';
import MediaCard from 'components/ComplaintPage/MediaSection/MediaCard';
import style from 'styles/ComplaintPage/MediaSection.sass';


const MediaSection = React.createClass({
  propTypes: {
    media: React.PropTypes.array,
    header: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      media: [],
      header: ''
    };
  },

  renderMediaItem(item, ind) {
    return (
      <MediaCard item={ item } key={ ind }/>
    );
  },

  render() {
    const media = this.props.media;
    const header = this.props.header;

    return (
      <Wrapper wrapperClass={ style.mediaSection } visible={ media.length > 0 }>
        <div className='row section-header'>
          <span className='section-title bold pad'>{ header }</span>
        </div>
        <div className='media-list pad'>
          { media.map(this.renderMediaItem) }
        </div>
      </Wrapper>
    );
  }
});

module.exports = MediaSection;
