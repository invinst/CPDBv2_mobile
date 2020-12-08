import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import clearIcon from 'img/ic-clear.svg';
import { instantScrollToTop } from 'utils/navigation-util';
import style from './search-navbar.sass';
import HorizontalScrolling from 'components/common/horizontal-scrolling';


export default class SearchNavbar extends Component {
  clearChosenCategoryButton() {
    const { chosenCategory, clearChosenCategory, query } = this.props;
    if (chosenCategory === '' || isEmpty(query)) {
      return null;
    }

    const onClick = () => {
      clearChosenCategory();
      instantScrollToTop();
    };

    return (
      <img
        className='clear-icon'
        src={ clearIcon }
        onClick={ onClick }
      />
    );
  }

  render() {
    let { categories, activeCategory, chosenCategory, scrollToCategory, updateActiveCategory } = this.props;

    if (chosenCategory) {
      // chosen category should always be rendered as active because it's the only one being rendered
      activeCategory = chosenCategory;
    } else if (!activeCategory && categories.length > 0) {
      // make first category active by default
      activeCategory = categories[0].id;
    }

    const links = categories.length <= 1 ? null : categories.map(
      (category, index) => {
        return (
          <button key={ index }
            onClick={ () => { scrollToCategory(category.id); updateActiveCategory(category.id); } }
            className={ cx('category-link', { 'active': activeCategory === category.id }) }>
            { category.filter }
          </button>
        );
      }
    );

    const clearChosenCategoryButton = this.clearChosenCategoryButton();

    return (
      <div className={ style.categories }>
        <HorizontalScrolling>
          { links }
          { clearChosenCategoryButton }
        </HorizontalScrolling>
      </div>
    );
  }
}

SearchNavbar.propTypes = {
  categories: PropTypes.array,
  activeCategory: PropTypes.string,
  scrollToCategory: PropTypes.func,
  updateActiveCategory: PropTypes.func,
  chosenCategory: PropTypes.string,
  clearChosenCategory: PropTypes.func,
  query: PropTypes.string,
};

SearchNavbar.defaultProps = {
  chosenCategory: '',
  categories: [],
};