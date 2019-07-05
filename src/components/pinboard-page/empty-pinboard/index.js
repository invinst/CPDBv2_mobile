import React, { PropTypes, Component } from 'react';

import styles from './empty-pinboard.sass';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';


export default class EmptyPinboardPage extends Component {
  render() {
    const { examplePinboards } = this.props;
    return (
      <div className={ styles.emptyPinboard }>
        <div className='empty-pinboard-title'>Add</div>
        <div className='empty-pinboard-description'>
          <div>
            Add officers, or complaint records through search.<br />
            <br />
            Or use an example pinboard as a baseline to get started.
          </div>
        </div>
        { examplePinboards.map(pinboard => (
          <ExamplePinboardLink
            key={ pinboard.id }
            id={ pinboard.id }
            title={ pinboard.title }
            description={ pinboard.description }
          />
        )) }
        <div className='arrow-head'/>
        <div className='arrow-shaft'/>
      </div>
    );
  }
}

EmptyPinboardPage.propTypes = {
  examplePinboards: PropTypes.array,
};
