import { Link } from 'react-router-dom';

function PageNotFound(): JSX.Element {
  return (
    <main className='page__main page__main--error'>
      <h1>Page not found</h1>
      <Link to="/">Go back</Link>
    </main>
  );
}

export default PageNotFound;
