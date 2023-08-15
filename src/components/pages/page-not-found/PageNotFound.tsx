import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function PageNotFound(): JSX.Element {
  return (
    <main className='page__main page__main--error'>
      <Helmet>
        <title>Six cities - Page not found</title>
      </Helmet>
      <h1>Page not found</h1>
      <Link to="/">Go back</Link>
    </main>
  );
}

export default PageNotFound;
