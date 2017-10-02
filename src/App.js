import React, { Component } from 'react';
import logo from './logo.svg';
import Cell from './Cell.js';
import _ from 'lodash';
import './App.css';
import EventEmitter from 'events';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
    this.load = this.load.bind(this);
    this.searchAll = this.searchAll.bind(this);
  }
  render() {
    const DAYS = _.range(1, 32).map((day) => ("Oct " + day));

    return (
      <div className="App">
        {this.state.isLoaded ||
         <button className='btn' onClick={this.load}>Load</button>}
        {this.state.isLoaded &&
         <button className='btn' onClick={this.searchAll}>Search all month</button>}
        {this.state.isLoaded &&
        <table>
          <tr>
            {DAYS.map((day) => (
              <th className='day-header' onClick={this.clicked}>{day}</th>
            ))}
          </tr>
          {_.range(24).map((hour) => (
            <tr>
              {DAYS.map((day) => (
                <Cell hour={hour} day={day} key={day}  events={this.events} />
              ))}
            </tr>
          ))}
        </table>
        }
      </div>
    );
  }

  componentWillMount() {
    this.events = new EventEmitter();
    this.events.setMaxListeners(0);
  }

  load() {
    this.setState({isLoaded: true});
  }

  searchAll() {
    this.events.emit('search');
  }
}

export default App;
