export const trackOpenExplainer = (officerId) => {
  window.ga('send', {
    hitType: 'event',
    eventCategory: 'visual_token_explainer',
    eventAction: 'open',
    eventValue: officerId
  });
};

