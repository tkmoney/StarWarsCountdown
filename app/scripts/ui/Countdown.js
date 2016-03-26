'use strict';

var React = require('react');

var Countdown = React.createClass({
    end_date: new Date('12/18/2015 12:00 AM'),
    getInitialState: function() {
        return {days: 0, hours: 0, minutes: 0, seconds: 0, countdown_completed: false};
    },
    tick: function() {
        var now = new Date();
        var diff  = this.end_date - now;
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;

        if(diff < 0){
            clearInterval(this.interval);
            return;
        }

        var days = Math.floor(diff / _day);
        var hours = Math.floor((diff % _day) / _hour);
        var minutes = Math.floor((diff % _hour) / _minute);
        var seconds = Math.floor((diff % _minute) / _second);

        this.setState({days: days, hours: hours, minutes: minutes, seconds: seconds});
    },
    componentDidMount: function() {
        this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    render: function() {
        return (
            <span className="countdown">{this.state.days} days {this.state.hours} hours {this.state.minutes} minutes and {this.state.seconds} seconds</span>
        );
    }
});


module.exports = Countdown;
