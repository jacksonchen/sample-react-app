var React = require('react');

var App = React.createClass({
  render: function(){
    return (
      // <div className="container">
      //   <div className="row">
      //     <ListContainer />
      //   </div>
      // </div>
      <p>Test</p>
    )
  }
})

React.render(
  <App />
  document.getElementById('app')
)
