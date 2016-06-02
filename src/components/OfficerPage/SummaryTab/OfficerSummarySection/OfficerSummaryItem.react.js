import React from 'react';
import Wrapper from 'components/Shared/Wrapper.react';
import OfficerPresenter from 'presenters/OfficerPresenter';


const OfficerSummarySection = React.createClass({
  render() {
    const presenter = OfficerPresenter(this.props.officer);
    const label = this.props.label;
    return (
      <Wrapper visible={ presenter.hasData(label) }>
        <span className='label'>{ label } </span>
        <span className='value'>{ this.props.data }</span>
      </Wrapper>
    );
  }
});

OfficerSummarySection.propsTypes = {
  'officer': React.PropTypes.object,
  'label': React.PropTypes.string,
  'data': React.PropTypes.string
};

OfficerSummarySection.defaultProps = {
  'officer': {},
  'label': '',
  'data': ''
};

export default OfficerSummarySection;
