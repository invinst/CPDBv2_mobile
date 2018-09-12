export const trackOpenExplainer = (officerId) => {
  window.Intercom('trackEvent', 'visual_token_explainer', { officerId });
};

export const trackSearchPage = () => {
  window.Intercom('trackEvent', 'search_page');
};
