var React = require('react'),
    AppTable = require('./components/AppTable');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <h1>A collection of Android Apps</h1>
        <AppTable />
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
