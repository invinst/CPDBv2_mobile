import { connect } from 'react-redux';

import { examplePinboardsSelector } from 'selectors/pinboard-page/pinboard';
import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { cmsSelector } from 'selectors/common/cms';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  examplePinboards: examplePinboardsSelector(state),
  emptyPinboardTitle: cmsSelector(state, 'pinboardPage', 'empty_pinboard_title'),
  emptyPinboardDescription: cmsSelector(state, 'pinboardPage', 'empty_pinboard_description'),
});

export default connect(mapStateToProps, {})(EmptyPinboard);
