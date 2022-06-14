import { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighLightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';


const QuoteDetail = () => {
	const {
		sendRequest,
		status,
		data: loadedQuotes,
		error,
	} = useHttp(getSingleQuote, true);

	const params = useParams();
	const { quoteId } = params;
	const match = useRouteMatch();

	useEffect(() => {
		sendRequest(quoteId);
	}, [sendRequest, quoteId]);

	if (status === 'pending') {
		return (
			<div className='centered'>
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return <p className='centered focused'>{error}</p>;
	}

	if (!loadedQuotes.text) {
		return <p>No quotes here</p>;
	}

	return (
		<Fragment>
			<HighLightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
			<Route path={`${match.path}`} exact>
				<div className='centered'>
					<Link to={`${match.url}/comments`} className='btn--flat'>
						Load Comments
					</Link>
				</div>
			</Route>
			<Route path={`${match.path}/comments`}>
				<Comments />
			</Route>
		</Fragment>
	);
};

export default QuoteDetail;
