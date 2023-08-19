import {useAppSelector} from '../hooks';
import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element {
  const errorMessage = useAppSelector((state) => state.error);
  return (
    errorMessage && <div className={styles['error-message']}>{errorMessage}</div>
  );
}

export default ErrorMessage;
