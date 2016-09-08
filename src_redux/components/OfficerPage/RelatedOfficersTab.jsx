import React from 'react';
import RelatedOfficerItem from 'components/OfficerPage/RelatedOfficersTab/RelatedOfficerItem';
import NoRelatedOfficer from 'components/OfficerPage/RelatedOfficersTab/NoRelatedOfficer';


//FIXME : Should refactor this component since we removed witness officers from the related officers
const RelatedOfficersTab = React.createClass({
  propTypes: {
    coAccused: React.PropTypes.array
  },

  renderRelatedOfficers(type) {
    return officer => {
      return (
        <RelatedOfficerItem type={ type } officer={ officer } key={ officer.id }/>
      );
    };
  },

  render() {
    const coAccused = this.props.coAccused;

    if (coAccused.length == 0) {
      return (
        <div>
          <NoRelatedOfficer />
        </div>
      );
    }

    return (
      <div className='related-officers-tab'>
        <div className='co-accused-list'>
          { coAccused.map(this.renderRelatedOfficers('Co-accused')) }
        </div>
      </div>
    );
  }
});

RelatedOfficersTab.defaultProps = {
  'coAccused': []
};

export default RelatedOfficersTab;
