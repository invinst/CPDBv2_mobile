import React from 'react';
import ComplainingWitnessPresenter from 'presenters/ComplainingWitnessPresenter';
import Wrapper from 'components/Shared/Wrapper.react';


const ComplainingWitness = React.createClass({
  propTypes: {
    complainingWitnesses: React.PropTypes.array
  },

  renderComplaintWitnessRow(complainingWitness) {
    const complainingWitnessPresenter = ComplainingWitnessPresenter(complainingWitness);

    // TODO: Adding id to complainingWitness
    return (
      <div className='complaining-witness-row row' key={ complainingWitness['cwit_id'] }>
        <div className='one column circle-wrapper center'>
          <div className='small-circle background-black circle'></div>
        </div>
        <div className='eleven columns'>
          { complainingWitnessPresenter.description }
        </div>
      </div>
    );
  },

  renderComplainingWitnessList(complainingWitnesses) {
    return complainingWitnesses.map(this.renderComplaintWitnessRow);
  },

  render() {
    const complainingWitnesses = this.props.complainingWitnesses || [];
    const numberOfComplainingWitness = complainingWitnesses.length;

    return (
      <Wrapper visible={ numberOfComplainingWitness > 0 } wrapperClass='complaining-witness'>
        <div className='section-header'>
          <span className='pad'>
            <span className='section-title bold'>Complaining Witness&nbsp;</span>
            <span className='title-count normal-weight'>({ numberOfComplainingWitness })</span>
          </span>
        </div>
        <div className='complaining-witness-list pad'>
          { this.renderComplainingWitnessList(complainingWitnesses) }
        </div>
      </Wrapper>
    );
  }
});

export default ComplainingWitness;
