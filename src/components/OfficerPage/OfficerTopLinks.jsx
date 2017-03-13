import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { startCase } from 'lodash';

import constants from 'constants';

import style from 'styles/OfficerPage/OfficerTopLinks.sass';


class OfficerTopLinks extends Component {
  renderLink(id, target, activePath) {
    const text = startCase(target);

    if (target === activePath) {
      return (
        <a className='officer-link active'>{ text }</a>
      );
    } else {
      return (
        <Link
          to={ `${constants.OFFICER_PATH}/${id}/${target}` }
          className='officer-link'>
          { text }
        </Link>
      );
    }
  }

  render() {
    const { id, currentPath } = this.props;

    return (
      <div className={ style.officerTopLinks }>

        { this.renderLink(id, 'summary', currentPath) }
        { this.renderLink(id, 'timeline', currentPath) }
        { this.renderLink(id, 'social-graph', currentPath) }

      </div>
    );
  }
}

OfficerTopLinks.propTypes = {
  id: PropTypes.number,
  currentPath: PropTypes.string
};

export default OfficerTopLinks;
