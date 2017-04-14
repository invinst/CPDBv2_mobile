import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class SearchNavbar extends Component {
  render() {
    let { categories, activeCategory, scrollToCategory, updateActiveCategory } = this.props;

    // Make first category active by default
    if (!activeCategory && categories.length > 0) {
      activeCategory = categories[0].id;
    }

    const links = categories.map(
      (category, index) => {
        const classNames = cx(
          'category-link',
          { 'active': activeCategory === category.id }
        );

        return (
          <button key={ index }
            onClick={ () => { scrollToCategory(category.id); updateActiveCategory(category.id); } }
            className={ classNames }>
            { category.name }
          </button>
        );
      }
    );

    return (
      <div className='categories'>
        { links }
      </div>
    );
  }
}

SearchNavbar.propTypes = {
  categories: PropTypes.array,
  activeCategory: PropTypes.string,
  scrollToCategory: PropTypes.func,
  updateActiveCategory: PropTypes.func
};
