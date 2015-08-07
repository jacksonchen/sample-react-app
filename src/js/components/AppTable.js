var React = require('react'),
    todoStore = require('../stores/todoStore'),
    fs = require('fs');
    todoActions = require('../actions/todoActions');

var appsDir = "../../../resources/data";

var AppTable = React.createClass({
  getInitialState: function() {
    return {
      list: todoStore.getStore(),
      username: "ayylmao"
    }
  },
  componentDidMount: function() {
    todoStore.addChangeListener(this._onChange)
    loadStore();
  },

  componentWillUnmount: function() {
    todoStore.removeChangeListener(this._onChange);
  },

  handleAddItem: function(newApp) {
    todoActions.addApp(newApp)
  },

  handleRemoveItem: function(newApp) {
    todoActions.removeApp(newApp)
  },

  _onChange: function() {
    this.setState({
      list: todoStore.getStore()
    })
  },
  render: function() {return (
    <p>Lists: {Object.keys(this.state.list)}</p>
  )}
});

module.exports = AppTable;
