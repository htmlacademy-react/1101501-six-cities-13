import {useAppSelector} from '../hooks';
import './error-message.css';

function ErrorMessage(): JSX.Element {
  const errorMessage = useAppSelector((state) => state.error);
  return (
    errorMessage && <div className='error-message'>{errorMessage}</div>
  );
}

export default ErrorMessage;
