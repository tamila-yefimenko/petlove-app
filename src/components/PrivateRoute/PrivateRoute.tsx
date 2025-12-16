import { ReactNode } from "react";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
