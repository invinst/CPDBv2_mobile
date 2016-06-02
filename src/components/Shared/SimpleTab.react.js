import cx from 'classnames';
import React from 'react';
import HelperUtil from 'utils/HelperUtil';
import Wrapper from 'components/Shared/Wrapper.react';
/*eslint-disable no-unused-vars*/
import style from 'styles/Shared/SimpleTab.sass';
/*eslint-enable no-unused-vars*/


const SimpleTab = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    navigation: React.PropTypes.bool
  },

  getInitialState() {
    const tabId = window.location.hash.replace('#', '');
    const tabIds = this.getTabIds();
    const tabIndex = tabIds.indexOf(tabId);
    const activeIndex = tabIndex > -1 ? tabIndex : 0;

    return {
      'activeIndex': activeIndex,
      'previousIndex': -1
    };
  },

  setActiveTab(index) {
    const previousIndex = this.state.activeIndex;

    this.setState({
      'activeIndex': index,
      'previousIndex': previousIndex
    });
  },

  getIndexOfNav(parent, nav) {
    let i;

    for (i = 0; i < parent.length; i++) {
      if (parent[i] == nav) {
        return i;
      }
    }
    return -1;
  },

  onTabItemClick(e) {
    const node = e.target;
    const parentChildren = node.parentNode.children;
    const index = this.getIndexOfNav(parentChildren, node);
    const tabIdentifier = HelperUtil.format('#{tabId}', { 'tabId': this.getTabIds()[index] });

    if (index != -1) {
      this.setActiveTab(index);
      window.history.pushState(null, '', window.location.pathname + tabIdentifier);
    }
  },

  renderChildren(prefix, items) {
    const self = this;

    return items.props.children.map((item, i) => {
      const itemKey = HelperUtil.format('{prefix}-{i}', { 'prefix': prefix, 'i': i });
      const classNames = cx(item.props.className, prefix, {
        'active': (i == self.state.activeIndex),
        'no-animation': (self.state.previousIndex == -1),
        'reverse-animation': (i > self.state.previousIndex)
      });

      return React.cloneElement(item, {
        'key': itemKey,
        className: classNames
      });
    });
  },

  renderTabNav() {
    const navs = this.props.children[0];
    return this.renderChildren('tab-nav', navs);
  },

  renderTabContent() {
    const tabs = this.props.children[1];
    return this.renderChildren('tab-content', tabs);
  },

  getTabIds() {
    return this.props.children[0].props.children.map(child => child.props.tabIdentifier);
  },

  renderNavigation() {
    const navs = this.props.children[0];
    const tabs = navs.props.children;

    const totalNumberOfChildren = tabs.length;
    const currentIndex = this.state.activeIndex;
    const nextIndex = (currentIndex + 1) % totalNumberOfChildren;
    const prevIndex = (currentIndex + totalNumberOfChildren - 1) % totalNumberOfChildren;
    const prev = tabs[prevIndex].props.children;
    const next = tabs[nextIndex].props.children;

    return (
      <Wrapper visible={ !!this.props.navigation } wrapperClass='tab-navigations'>
        <div className='row'>
          <div className='six columns' onClick={ this.setActiveTab.bind(this, prevIndex) }>
            <span className='icon icon-left'/>
            { prev }
          </div>
          <div className='six columns align-right' onClick={ this.setActiveTab.bind(this, nextIndex) }>
            { next }
            <span className='icon icon-right'/>
          </div>
        </div>
      </Wrapper>
    );
  },

  render() {
    return (
      <div>
        <div className='tab-navs' onClick={ this.onTabItemClick }>
          { this.renderTabNav() }
        </div>
        <div className='tab-contents'>
          { this.renderTabContent() }
        </div>
        { this.renderNavigation() }
      </div>
    );
  }
});

export default SimpleTab;
