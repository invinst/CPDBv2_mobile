exports.command = function () {
  this.windowHandles(function (result) {
    this.pause(2000);
    const handles = result.value;
    this.switchWindow(handles[handles.length - 1]);
  });
};
