import s from '../styles/app.module.scss'
import SearchBar from '../components/search/SearchBar';



export default function App() {

  return (
    <div className={s.app}>
      <h1 className={s.title}>Jobscraper</h1>
      {<SearchBar />}
      
    </div>
  );
}

// 
{/* <form onSubmit={submitTerms()}>
<button className={`fa fa-plus ${styles.searchbutton}`} aria-hidden="true" type="submit"></button>
<input type='text' name="terms" style={{ width: "300px" }} value={this.state.terms} onChange={this.handleChange} />
<button className={`fa fa-search ${styles.searchbutton}`} aria-hidden="true" type="submit"></button>
</form> */}

  // const submitTerms = () => {
  //   if (terms) {
  //     console.log(terms)
  //     fetch('/api/searchDemo' + new URLSearchParams({ terms })).then(response => {
  //         return response.json()
  //       }).then(json => {
  //         console.log(json)
  //         setTerms(json);
  //       })
  //   }
  // }