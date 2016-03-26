'use strict';

var React = require('react');
var Tweet = require("./Tweet");


var Tweets = React.createClass({
    getInitialState: function() {
        return {tweets:[]};
    },
    componentDidMount: function() {
        console.log('this.props.tweets: ', this.props.tweets);
       this.setState({
            tweets: this.props.tweets
        });

       var twitter_content = React.findDOMNode(this.refs.container);
       $(twitter_content).on('animationend webkitAnimationEnd', this.onAnimEnd);
    },
    onAnimEnd: function(){
        this.props.parentAnimEnd();

        var self = this;
        this.refs.container.style.animationName = 'none';
        window.setTimeout(function(){
            self.refs.container.style.animationName = 'scroll';
        }, 500);
    },
    componentWillUnmount: function() {
    },
    render: function() {
        var t = [];
        for(var i = 0; i < this.props.tweets.length; i++){
            var data = this.props.tweets[i];
            t.push(<Tweet key={i} tweet_data={data} />);
        };

        return (
            <div ref='container' className="twitter_content">{t}</div>
        );
    }
});


module.exports = Tweets;
