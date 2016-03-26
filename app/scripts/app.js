

var React = window.React = require('react'),
    Countdown = require("./ui/Countdown"),
    Twitter = require("./ui/Twitter"),
    mountNode = document.getElementById("app");


var StarWarsApp = React.createClass({
  render: function() {
    return (
        <div>
            <Twitter />
            <div className="countdown_wrapper">
                <div>
                    <h1>Star Wars: The Force Awakens</h1>
                    <p>will release in <Countdown /></p>
                </div>
            </div>

        </div>
    );
  }
});


React.render(<StarWarsApp />, mountNode);

