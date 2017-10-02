import React, { Component }  from 'react';
import './App.css';

var randomMillis = function() {
  // return 0;
  return Math.floor(Math.random() * 500);
}

export default class Cell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearching: false,
      searchResults: null
    }
    this.clicked = this.clicked.bind(this);
    this.search = this.search.bind(this);
  }
  render() {
    if (this.state.isSearching) {
      return (
        <td className='hour-cell'>
          <div className='searching'>
            ...
          </div>
        </td>
      );
    } else if (this.state.searchResults) {
      var options = this.state.searchResults.options;
      var classes = 'bad-results';
      if (options > 3) {
        classes =  'good-results';
      } else if (options > 1 && options <= 3) {
        classes = 'weak-results';
      }

      return (
        <td className='hour-cell' onClick={this.clicked}>
          <div className={classes}>
            <div>{this.state.searchResults.options}</div>
            <div className="result-label">results</div>
          </div>
        </td>
      );
    } else {
      return (
        <td className='hour-cell' onClick={this.clicked}>
          <div className='time'>
            {this.props.hour}:00
          </div>
        </td>
      );
    }
  }
  clicked() {
    this.search();
  }
  search() {
    var self = this;
    self.setState({
      isSearching: true,
      searchResults: {options: null}
    });
    setTimeout(function() {
      self.setState({
        isSearching: false,
        searchResults: {options: Math.floor(Math.random() * 5)}
      });
    }, randomMillis());
  }

  componentWillMount() {
    this.props.events.on('search', () => this.search());
  }
};
