// import React, {
//   Component,
//   PropTypes
// } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
//
// // old code
// import objectAssign from 'object-assign';
// import Base from 'components/Base.react';
// import About from 'components/Shared/About.react';
// import MainPageContent from 'components/MainPage/MainPageContent.react';
// import MainPageStore from 'stores/MainPageStore';
// import HelperUtil from 'utils/HelperUtil';
// import SuggestionAPI from 'utils/SuggestionAPI';
// import cx from 'classnames';
// import style from 'styles/MainPage.sass';
//
//
// const OldMainPageContainer = React.createClass(objectAssign(Base(MainPageStore), {
//   getInitialState() {
//     return {
//       'isSearchFocused': 0
//     };
//   },
//
//   componentDidMount() {
//     const term = HelperUtil.fetch(this, 'props.params.query', '');
//     const santinizedTerm = term.replace(/\+|\-|\_/g, ' ');
//
//     MainPageStore.addChangeListener(this._onChange);
//
//     if (santinizedTerm) {
//       SuggestionAPI.get(santinizedTerm);
//     }
//   },
//
//   render() {
//     const isSearchFocused = this.state.isSearchFocused;
//
//     return (
//       <div className={ cx('content', style.mainPage) }>
//         <MainPageContent topLeft={ isSearchFocused } />
//         <About topLeft={ isSearchFocused } />
//       </div>
//     );
//   }
// }));
//
// export const old = OldMainPageContainer;
//
// class MainPage extends Component {
//   componentDidMount() {
//     const term = HelperUtil.fetch(this, 'props.params.query', '');
//     const santinizedTerm = term.replace(/\+|\-|\_/g, ' ');
//
//     if (santinizedTerm) {
//       SuggestionAPI.get(santinizedTerm);
//     }
//   }
//
//   render() {
//     const { isSearchFocused } = this.props;
//
//     return (
//       <div className={ cx('content', style.mainPage) }>
//         <MainPageContent topLeft={ isSearchFocused } />
//         <About topLeft={ isSearchFocused }/>
//       </div>
//     );
//   }
// }
//
// class MainPageContainer extends Component {
//   componentDidMount() {
//     const term = HelperUtil.fetch(this, 'props.params.query', '');
//     const santinizedTerm = term.replace(/\+|\-|\_/g, ' ');
//
//     // MainPageStore.addChangeListener(this._onChange);
//
//     if (santinizedTerm) {
//       SuggestionAPI.get(santinizedTerm);
//     }
//   }
//
//   render() {
//     /*eslint-disable*/
//
//     const { isSearchFocused } = this.props;
//
//     return (
//       <div className={ cx('content', style.mainPage) }>
//         <MainPageContent topLeft={ isSearchFocused } />
//         <About topLeft={ isSearchFocused }/>
//       </div>
//     );
//   }
// }
//
// MainPageContainer.propTypes = {
//   isSearchFocused: PropTypes.number
// };
//
// MainPageContainer.defaultProps = {
//   isSearchFocused: 0
// };
//
//
// // class MainPageContainer extends Component {
// //   render() {
// //     // const { actions } = this.props;
// //     return <div>This is my component</div>;
// //   }
// // }
//
// // MainPageContainer.propTypes = {
// //   actions: PropTypes.object.isRequired
// // };
//
// function mapStateToProps(state, ownProps) {
//   const props = {};
//   return props;
// }
//
// function mapDispatchToProps(dispatch) {
//   const actions = {};
//   const actionMap = { actions: bindActionCreators(actions, dispatch) };
//   return actionMap;
// }
//
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
