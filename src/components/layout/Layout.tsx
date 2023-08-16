import {Link, Outlet, useLocation} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {useAppDispatch, useAppSelector} from '../hooks';
import {logOut} from '../../store/api-actions';
import {MouseEvent} from 'react';
import classNames from 'classnames';

type TLayoutProps = {
  authStatus: AuthorizationStatus;
}

function Layout({ authStatus }: TLayoutProps): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const {pathname} = useLocation();

  const handleLogOutClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    dispatch(logOut());
  };

  return (
    <div className={classNames({
      'page': true,
      'page--gray': pathname.includes(AppRoute.Login) || pathname === AppRoute.Root || pathname.includes('main-empty'),
      'page--login': pathname.includes(AppRoute.Login),
      'page--main': pathname === AppRoute.Root || pathname.includes('main-empty'),
      'page--favorites-empty': pathname.includes('favorites-empty')
    })}
    >
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root} className={classNames({
                'header__logo-link--active': pathname === AppRoute.Root,
                'header__logo-link': true
              })}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              {authStatus === AuthorizationStatus.Auth ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {user?.email ?? ''}
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link className="header__nav-link" onClick={handleLogOutClick}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                !pathname.includes(AppRoute.Login)
                &&
                <ul className="header__nav-list">
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
