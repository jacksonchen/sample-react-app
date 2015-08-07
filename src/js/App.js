var React = require('react'),
    AppTable = require('./components/AppTable');

var App = React.createClass({
  render: function(){
    return (
      <table>
        <AppTable />
      </table>
    )
  }
})

React.render(
  <App />,
  document.getElementById('app')
)
