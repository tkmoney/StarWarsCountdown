'use strict';

var React = require('react');

var Tweet = React.createClass({
    getInitialState: function() {
        return {status_text: "", profile_pic: "", username: "", display_name: ""};
    },
    componentDidMount: function() {
    },
    componentWillUnmount: function() {
    },
    returnMedia: function(){
        var imgs = [];

        var media_arr =  this.props.tweet_data.entities.media;
        for(var i = 0; i < media_arr.length; i++){
            var s = media_arr[i].media_url;
            imgs.push(<img src={s} />);
        }
        return (<p>{imgs}</p>);
    },
    render: function() {
        var imgs = null;
        if(typeof(this.props.tweet_data.entities.media) != 'undefined' && this.props.tweet_data.entities.media.length > 0){
            imgs = this.returnMedia();
        }
        return (
            <div className="tweet">
                <p><span>@{this.props.tweet_data.user.screen_name}: {this.props.tweet_data.text}</span></p>
                {imgs}
            </div>);
    }
});


module.exports = Tweet;
