import React, { useState, useReducer, Component } from 'react';

import './App.css';

function App() {

  return (
    <div className="App">
      <header>
        <h1>Jobscraper</h1>
      </header>
      <MainView />
    </div>
  );
}

class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      terms: '',
      msg: '',
      results: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHello = this.handleHello.bind(this);
  }

  handleChange(event) {
    // could do input validation here
    this.setState({ terms: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.terms) {
      console.log(this.state.terms)
      fetch('/search?' + new URLSearchParams({
        terms: this.state.terms,
      })).then(response => {
        return response.json()
      }).then(json => {
        console.log(json)
        console.log(json[0].job)
        this.setState({ results: json });
      })
    }
    event.preventDefault();
  }

  handleHello(event) {
    fetch('/hello').then(response => {
      return response.json().then((msg) => {
        console.log(msg.message)
        this.setState({ msg: msg.message });
      })
    })
  }

  // const element = <displayData data=this.state.results len=this.state.results.len() />;

  displayData() {
    var html = '';
    for (var i = 0; i < 3; i++) {
      html += '<tr>';
      html += '<td>' + this.state.results[i].job + '</td>';
      html += '<td>' + this.state.results[i].job + '</td>';
      html += '<td>' + this.state.results[i].desc + '</td>';
      html += '</tr>';
    }
    return html
  }

  render() {
    return (
      <div className="MainView">
        <button onClick={this.handleHello}>Hello</button>
        <p>{this.state.msg}</p>
        <p>Enter search terms separated by +. E.g: doctor+weed</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name="terms" style={{ width: "300px" }} value={this.state.terms} onChange={this.handleChange} />
          <input type='submit' />
        </form>
        <table style={{ margin: "0" }}>
          <tbody>
            <tr>
              <th>Job Title</th>
              <th>URL</th>
              <th>Description</th>
            </tr>
            {this.state.results.map((job =>
              <tr>
                <td key={job.id}>{job.job}</td>
                <td key={job.id}>{job.url}</td>
                <td key={job.id}>{job.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
