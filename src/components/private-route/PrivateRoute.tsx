import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../constants';

type PrivateRouteProps = PropsWithChildren<{ authStatus: string }>;

function PrivateRoute({ children, authStatus }: PrivateRouteProps): React.ReactNode {
  return authStatus === 'AUTH' ? (
    children
  ) : (
    <Navigate to={AppRoute.Login}></Navigate>
  );
}

export default PrivateRoute;
