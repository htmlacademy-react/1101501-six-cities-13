import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {TAuthData} from '../../types/auth-data';
import {RequestStatus} from '../../constants';
import {logIn} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../hooks';

type TChangeEvent = ChangeEvent<HTMLInputElement>
type TSubmitEvent = FormEvent

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const PASSWORD_INVALID_MESSAGE = 'Password must contain more than 8 chars and at least one letter and one digit';
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const EMAIL_INVALID_MESSAGE = 'Please, enter correct email address';
const FAILED_SUBMIT_FORM = 'Failed submit form. Please, try again!';

export function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const logInStatus = useAppSelector((state) => state.loginStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<TAuthData>({
    email: '',
    password: '',
  });

  const handleFormChange = (evt: TChangeEvent) => {
    const {name, value} = evt.target;

    if (errorMessage) {
      setErrorMessage(null);
    }
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: TSubmitEvent) => {
    evt.preventDefault();

    if (!EMAIL_REGEX.test(formData.email)) {
      setErrorMessage(EMAIL_INVALID_MESSAGE);
      return;
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      setErrorMessage(PASSWORD_INVALID_MESSAGE);
      return;
    }
    dispatch(logIn(formData));
  };

  useEffect(() => {
    if (logInStatus === RequestStatus.Rejected) {
      setErrorMessage(FAILED_SUBMIT_FORM);
    }
  },[logInStatus]);

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFormChange}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          value={formData.password}
          name="password"
          placeholder="Password"
          onChange={handleFormChange}
        />
      </div>
      {errorMessage && <div className="login__input-wrapper form__input-wrapper">{errorMessage}</div>}
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}
