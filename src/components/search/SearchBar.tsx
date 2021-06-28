import React, { useEffect, useReducer, useState } from 'react'
import s from '../../styles/app.module.scss'

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

export default function SearchBar () {
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
      <div className={s.termContainer} data-test="_term_container">
        {terms.map((term =>
          <React.Fragment key={term.id}>
            <div className={s.term} key={term.id} data-test={`_delete_buttondiv_${term.name}`}>
              <button className={s.deletebutton}
                onClick={() => removeTerm(term.id)}>
              </button>
              {term.name}
            </div>
          </React.Fragment>
        ))}
      </div>
    )
  }


  useEffect(() => {
    console.log(terms);
    console.log(input);
  })


  function clearInput() {

    const input = document.getElementById(s.searchbar) as HTMLFormElement;
    if (input) {
      console.log('clearing')
      setInput('');
      input.reset();
    }
  }

  const addTerm = () => {
    let newTerms: Term[] = [];
    if (input) {
      newTerms = [
        ...terms,
        { name: input, id: terms.length }
      ];
      setTerms(newTerms);
    }

    clearInput();
    // console.log(terms);
  }

  const updateIds = (terms: Term[]) => {
    for (let key in terms) {
      terms[key].id = parseInt(key);
    }
    // console.log(terms);
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  }

  return (
    <div className={s.searchContainer}>
        <div className={s.searchbar}>
          <form id={s.searchbar}>
            <button
              className={`fa fa-plus fa-3x ${s.button} ${s.ripple}`}
              data-test="_add_button"
              type='button'
              onClick={() => addTerm()}
              aria-hidden="true"
            ></button>
            <input id={s.inputbar} placeholder="enter keyword" type='text' onChange={handleChange}></input>
            <button
              type='button'
              className={`fa fa-search fa-3x ${s.button} ${s.ripple}`}
              aria-hidden="true"
              onClick={() => searchDemo()}
            ></button>
          </form>
        </div>
        {showTerms ? <Terms /> : null}
        {<Results />}
      </div>
  );
}