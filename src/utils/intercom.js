export const showIntercomLauncher = show => {
  window.Intercom('update', { 'hide_default_launcher': !show });
};
