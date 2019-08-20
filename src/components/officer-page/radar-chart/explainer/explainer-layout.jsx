import React, { Component, PropTypes } from 'react';

import style from './explainer-layout.sass';
import StaticRadarChart from 'components/common/radar-chart';
import ExplainerNav from './explainer-nav';


export default class ExplainerLayout extends Component {
  render() {
    const {
      radarChartConfig,
      title,
      content,
      leftNavigationText,
      rightNavigationText,
      leftNavHandler,
      rightNavHandler,
    } = this.props;

    return (
      <div className={ style.explainerLayout }>
        <div className='explainer-radar-chart-container'>
          <StaticRadarChart { ...radarChartConfig }/>
          <div className='explainer-close-button' onClick={ this.props.closeExplainer }>
            <div className='close-button'>&times;</div>
          </div>
        </div>
        <ExplainerNav
          leftNavigationText={ leftNavigationText }
          rightNavigationText={ rightNavigationText }
          leftNavHandler={ leftNavHandler }
          rightNavHandler={ rightNavHandler }
        />
        <div className='explainer-content'>
          <h5 className='title'>{ title }</h5>
          { content }
        </div>
      </div>
    );
  }
}

ExplainerLayout.propTypes = {
  radarChartConfig: PropTypes.object,
  leftNavigationText: PropTypes.string,
  rightNavigationText: PropTypes.string,
  leftNavHandler: PropTypes.func,
  rightNavHandler: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.node,
  closeExplainer: PropTypes.func,
};
