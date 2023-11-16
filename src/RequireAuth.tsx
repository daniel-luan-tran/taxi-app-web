import { Navigate } from 'react-router-dom';
import { useCheckAuth } from './hooks';
import { Spinner } from './components/common';

interface RequireAuthProps {
  children: React.ReactElement;
  secured?: boolean;
  redirectTo?: string;
}

/**
 * Component used to wrap the react-router 'Route' component
 * to check if user has been authenticated before rendering
 * the component.
 *
 * Source: https://ui.dev/react-router-protected-routes-authentication
 */
function RequireAuth({ children, secured }: RequireAuthProps) {
  const { isCheckingAuth, isAuthed } = useCheckAuth();

  if (!secured) return children;
  if (isCheckingAuth)
    return (
      <div className="dropdowninput__spinner">
        <Spinner size="tiny" />
      </div>
    );
  if (isAuthed) return children;

  return <Navigate to={'/login'} replace />;
}

export default RequireAuth;
