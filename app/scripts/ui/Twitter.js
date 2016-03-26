'use strict';

var React = require('react');
var Tweets = require("./Tweets");

var Twitter = React.createClass({
    largest_tweet_id: 0,
    getInitialState: function() {
        return {tweets: []};
    },
    setLargestTweet: function(tweets){
        for (var i = 0; i < tweets.length; i++) {
            if(tweets[i].id > this.largest_tweet_id){
                this.largest_tweet_id = tweets[i].id;
            }
        };
    },
    onAnimationEnd: function(){
        this.getTweets();
    },
    getTweets: function(){
        var self = this;
        $.ajax({
            url: "http://localhost:8080/twitter.php",
            jsonp: 'callback',
            dataType: 'jsonp',
            data: {since_id: self.largest_tweet_id},
            success: function(response){
                if(typeof(response.statuses) != 'undefined' && response.statuses.length > 0){
                    self.setState({tweets: response.statuses});
                    self.setLargestTweet(response.statuses);
                }
            }
        });
    },
    componentDidMount: function() {
        this.getTweets();
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div className="tweets_wrapper">
                <Tweets tweets={this.state.tweets} parentAnimEnd={this.onAnimationEnd} />
            </div>
        );
    }
});


module.exports = Twitter;
