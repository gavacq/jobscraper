import React, { useReducer, useState } from 'react'
import styles from '../styles/app.module.scss'


export type SearchResult = {
  name: string,
  url: string,
  desc: string,
  keywords: string,
  id: number | undefined
};

type Term = {
  name: string,
  id: number
};

export default function App() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [input, setInput] = useState('');
  const [showTerms, setShowText] = useState(true);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);


  
  const searchDemo = (): any => {
    // console.log('demo search');
    const res = fetch('/api/searchDemo').then(response => {
      return response.json();
    }).then(json => {
      setSearchResults(json)
      // console.log(json);
    });
    // console.log(typeof res);
    return res;
  }
  
  const Results = () => {
    return (
      <div>
        {searchResults.map((res =>
          <div key={res.id}>{res.name}</div>
          ))}
      </div>
    )
  }
  
  const Terms = () => {
    return (
      <div className={styles.termContainer}>
        {terms.map((term =>
          <React.Fragment key={term.id}>
            <div className={styles.term} key={term.id}>
              <button className={styles.buttonoverlapmulti}
                onClick={() => removeTerm(term.id)}>
              </button>
              {term.name}
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }
  
  const addTerm = () => {
    const newTerms = [
      ...terms,
      { name: input, id: terms.length }
    ];
    
    setTerms(newTerms);
    console.log(terms);
  }

  const updateIds = (terms: Term[]) => {
    for (let key in terms) {
      terms[key].id = parseInt(key);
    }
    console.log(terms);
  }

  /* https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react */
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  
  const removeTerm = (id: number) => {
    console.log(terms);
    console.log(id)
    let newTerms = terms;
    newTerms.splice(id, 1);
    updateIds(newTerms);
    setTerms(newTerms);
    forceUpdate();
  }
  
  const handleChange = (e: any) => {
    setInput(e.target.value);
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Jobscraper</h1>
      <div className={styles.searchContainer}>
        <div></div>
        <div className={styles.searchbar}>
          <button
            className={`fa fa-plus fa-lg ${styles.button}`}
            onClick={() => addTerm()}
            aria-hidden="true"
          ></button>
          <input className={styles.inputbar} placeholder="enter keyword" type='text' onChange={handleChange}></input>
          <button
            className={`fa fa-search fa-lg ${styles.button}`}
            aria-hidden="true"
            onClick={() => searchDemo()}
          ></button>
        </div>
        <div></div>
        <div></div>
        {showTerms ? <Terms /> : null}
        <div></div>
        {<Results />}
      </div>
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