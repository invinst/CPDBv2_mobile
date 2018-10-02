import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import clearIcon from 'img/ic-clear.svg';
import { instantScrollToTop } from 'utils/navigation-util';

export default class SearchNavbar extends Component {
  clearChosenCategoryButton() {
    const { chosenCategory, clearChosenCategory } = this.props;
    if (chosenCategory === '') {
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
        const classNames = cx(
          'category-link',
          { 'active': activeCategory === category.id }
        );

        return (
          <button key={ index }
            onClick={ () => { scrollToCategory(category.id); updateActiveCategory(category.id); } }
            className={ classNames }>
            { category.filter }
          </button>
        );
      }
    );

    const clearChosenCategoryButton = this.clearChosenCategoryButton();

    return (
      <div className='categories'>
        { links }
        { clearChosenCategoryButton }
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
  clearChosenCategory: PropTypes.func
};

SearchNavbar.defaultProps = {
  chosenCategory: '',
  categories: []
};
