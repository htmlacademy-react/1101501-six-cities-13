import {useAppSelector} from '../hooks';
import styles from './error-message.module.css';
import {getErrorMessage} from '../../store/app-data/app-data.selectors';

function ErrorMessage(): JSX.Element {
  const errorMessage = useAppSelector(getErrorMessage);
  return (
    errorMessage && <div className={styles['error-message']}>{errorMessage}</div>
  );
}

export default ErrorMessage;
