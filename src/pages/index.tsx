import { Component } from 'react';
import styles from '../styles/button.module.scss'
import { SearchResults } from '../components/search'


type MainViewState = {
  terms: string,
  msg: string,
  results: SearchResults[]
};


export default function App() {
  return (
    <>
      <div className="App">
        <header>
          <h1 className={styles.title}>Jobscraper</h1>
        </header>
        <MainView />
      </div>
      <div><p>test</p></div>
    </>
  );
}

class MainView extends Component<any, MainViewState> {
  constructor(props: any) {
    super(props)
    this.state = {
      terms: '',
      msg: '',
      results: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHello = this.handleHello.bind(this);
  }

  handleChange(event: any) {
    // could do input validation here
    this.setState({ terms: event.target.value });
  }

  handleSubmit(event: any) {
    if (this.state.terms) {
      console.log(this.state.terms)
      fetch('/search?' + new URLSearchParams({
        terms: this.state.terms,
      })).then(response => {
        return response.json()
      }).then(json => {
        console.log(json)
        this.setState({ results: json });
      })
    }
    event.preventDefault();
  }

  handleHello() {
    fetch('/hello').then(response => {
      return response.json().then((msg) => {
        console.log(msg.message)
        this.setState({ msg: msg.message });
      })
    })
  }

  render() {
    return (
      <div className="MainView">
        <button onClick={this.handleHello}>Hello</button>
        <p>{this.state.msg}</p>
        <p>Enter search terms separated by +. E.g: doctor+weed</p>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name="terms" style={{ width: "300px" }} value={this.state.terms} onChange={this.handleChange} />
          <button className={`fa fa-search ${styles.searchbutton}`} aria-hidden="true" type="submit"></button>
        </form>
        <table style={{ margin: "0" }}>
          <tbody>
            <tr>
              <th>Job Title</th>
              <th>Description</th>
            </tr>
            {this.state.results.map((job =>
              <tr key={job.id}>
                <td><a href={job.url}>{job.name}</a></td>
                <td>{job.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
