var React = require('react'),
    todoStore = require('../stores/todoStore'),
    todoActions = require('../actions/todoActions');

var AppTable = React.createClass({
  getInitialState: function() {
    return {
      list: todoStore.getStore(),
      username: "ayylmao"
    }
  },
  componentDidMount: function() {
    todoStore.addChangeListener(this._onChange);
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
    <div className="AppTable">
    Lists: {Object.keys(this.state.list)}
    </div>
  )}
});

module.exports = AppTable;
