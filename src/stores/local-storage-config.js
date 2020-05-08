/* istanbul ignore next */
export default {
  slicer(paths) {
    return (state) => ({
      suggestionApp: {
        recentSuggestions: state.suggestionApp.recentSuggestions,
      },
      pinboardIntroduction: state.pinboardIntroduction,
    });
  },
};
