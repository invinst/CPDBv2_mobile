import cx from 'classnames';
import React from 'react';

import style from 'styles/MainPage/MainPageContent/ProjectSummary.sass';


const ProjectSummary = React.createClass({
  propTypes: {
    topLeft: React.PropTypes.number
  },

  render() {
    const topLeft = this.props.topLeft;

    return (
      <div className={ cx(style.projectSummary, 'animation', { 'top-left': topLeft }) }>
        <div className='cpdb-logo'>CPDP</div>
        <div className='cpdb-description'>
          <div className='paragraph'>Allegations of police misconduct are public information.</div>
          <div className='paragraph'>Search here for complaint records released under FOIA by the Chicago Police
            Department.
          </div>
          <div className='paragraph'>Type the name of a police officer, badge number, or CRID number.</div>
        </div>
      </div>
    );
  }
});

export default ProjectSummary;
