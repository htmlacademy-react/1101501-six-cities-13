import {AppRoute, AuthorizationStatus, CityNames} from '../../../constants';
import {useEffect, useMemo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {Helmet} from 'react-helmet-async';
import {getRandomPositiveNumber} from '../../../utils/utils';
import {setActiveCity} from '../../../store/app-data/app-data.slice';
import {LoginForm} from '../../login-form/login-form';

type TLoginProps = {
  authStatus: AuthorizationStatus;
}

function Login({ authStatus }: TLoginProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomLocation = useMemo(
    () => CityNames[getRandomPositiveNumber(CityNames.length - 1)], []
  );

  const handleCityLabelClick = () => {
    dispatch(setActiveCity(randomLocation));
  };

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authStatus, navigate]);

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>Six cities - Sign in</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Root} onClick={handleCityLabelClick}>
              <span>{randomLocation}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
