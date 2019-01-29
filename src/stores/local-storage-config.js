/* istanbul ignore next */
export default {
  slicer(paths) {
    return (state) => ({
      suggestionApp: {
        initialSuggestions: {
          recent: state.suggestionApp.initialSuggestions.recent
        }
      }
    });
  }
};
