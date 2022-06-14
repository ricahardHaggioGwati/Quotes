import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import QuoteForm from '../components/quotes/QuoteForm';
import { useEffect } from 'react';

const NewQuote = () => {
	const { sendRequest, status } = useHttp(addQuote);
    const history = useHistory();
    
    useEffect(() => {
        if (status === 'completed') {
            history.push('./quotes')
        }
    }, [status, history])

	const AddHandler = (quoteData) => {
		sendRequest(quoteData);
	};

	return <QuoteForm isLoading={status === 'pending'} onAddQuote={AddHandler} />;
};

export default NewQuote;
