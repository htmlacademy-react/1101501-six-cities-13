import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';

type TPrivateRouteProps = PropsWithChildren<{ authStatus: AuthorizationStatus }>;

function PrivateRoute({ children, authStatus }: TPrivateRouteProps): React.ReactNode {
  return authStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login}></Navigate>
  );
}

export default PrivateRoute;
