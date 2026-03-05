import { ReactNode } from "react";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const token = useAppSelector(selectToken);

  if (token && isRefreshing) {
    return null;
  }

  if (!token && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
