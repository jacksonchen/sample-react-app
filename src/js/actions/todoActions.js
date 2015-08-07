var appDispatcher = require('../dispatcher/appDispatcher'),
    appConstants = require('../constants/appConstants');

var todoActions = {
  addApp: function(app) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_APP,
      data: app
    });
  },

  removeApp: function(app) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_APP,
      data: app
    });
  },

  updateApp: function(app) {
    appDispatcher.handleAction({
      actionType: appConstants.UPDATE_APP,
      data: app
    });
  }
}

module.exports = todoActions;
