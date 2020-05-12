module.exports = {
  clearReduxStore: function (client) {
    client.execute('localStorage.removeItem("redux")');
    client.refresh();
  },
};
