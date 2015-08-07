var Dispatcher = require('flux').Dispatcher,
    appDispatcher = new Dispatcher();

appDispatcher.handleAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

module.exports = appDispatcher;
