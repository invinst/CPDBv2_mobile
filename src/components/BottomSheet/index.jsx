import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import style from 'styles/BottomSheet.sass';
import { goUp } from 'utils/NavigationUtil';
import { hasChildren, hasGrandchildren } from 'utils/ComponentUtil';
import { StickyContainer } from 'react-sticky';

/*
This is a not-too-pretty hack to achieve "nested bottom sheet" with animations.

The BottomSheet component has 3 layers (from bottom to top):

- Background: opaque white background with header text on top.
- Overlay: partly transparent black background. Goes back 1 level on click.
- Sheet: actual content on white background. Has margin-top to reveal part of
  the overlay and Background layer's text.

A concrete example:

- On root: /
  + Nothing is rendered

- On first level: /reporting
  + Background shows `cpdp`
  + Overlay appears with `enter` animation
  + Sheet shows ReportingPage's content

- On second level: /reporting/1337
  + Background shows ReportingPage's content
  + Overlay stays
  + Sheet shows ReportingDetail's content
*/

export default class BottomSheet extends Component {

  renderBackground() {
    if (!hasChildren(this)) {
      return null;
    }
    if (hasGrandchildren(this)) {
      return (
        <div className='background'>
          <h1 className='header'>
            { this.props.children }
          </h1>
        </div>
      );
    }

    return (
      <div className='background'>
        <h1 className='header'>
          cpdp
        </h1>
      </div>
    );
  }

  renderOverlay() {
    if (!hasChildren(this)) {
      return null;
    }
    const { router } = this.props;
    return <div className='overlay' onClick={ goUp.bind(this, router, window.location.pathname) }></div>;
  }

  renderSheet() {
    if (!hasChildren(this)) {
      return null;
    }

    // Render grandchildren instead of children if available
    if (hasGrandchildren(this)) {
      return (
        <div className='sheet'>
          { React.Children.map(this.props.children, (child) => child.props.children) }
          <div className='sheet-bottom-padding'></div>
        </div>
      );
    }

    return (
      <div className='sheet'>
        { this.props.children }
        <div className='sheet-bottom-padding'></div>
      </div>
    );
  }

  render() {
    const { transitionDuration } = this.props;

    return (
      <StickyContainer className={ style.bottomSheet }>
        <ReactCSSTransitionGroup
          component='div'
          transitionName='bottom-sheet-background'
          transitionEnterTimeout={ transitionDuration }
          transitionLeaveTimeout={ transitionDuration }
        >
          { this.renderBackground() }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          component='div'
          transitionName='bottom-sheet-overlay'
          transitionEnterTimeout={ transitionDuration }
          transitionLeaveTimeout={ transitionDuration }
        >
          { this.renderOverlay() }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          component='div'
          transitionName='bottom-sheet'
          transitionEnterTimeout={ transitionDuration }
          transitionLeaveTimeout={ transitionDuration }
        >
          { this.renderSheet() }
        </ReactCSSTransitionGroup>

      </StickyContainer>
    );
  }
}

BottomSheet.propTypes = {
  children: PropTypes.object,
  router: PropTypes.object,
  location: PropTypes.object,
  transitionDuration: PropTypes.number
};
