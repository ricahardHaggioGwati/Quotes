import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import sortQuotes from './Sorting';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {

  const history = useHistory()
  const location = useLocation()
  //const match  = useRouteMatch()

  const queryParams = new URLSearchParams(location.search)
  const isSortingAsc = queryParams.get('sort') === 'asc'

  const sortedQuotes = sortQuotes(props.quotes, isSortingAsc)

  const changeSortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `${isSortingAsc ? 'desc' : 'asc'}`
    })
    //history.push(`${match.url}?sort=` + (isSortingAsc ? 'desc' : 'asc')) 
  }


  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {!isSortingAsc ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
