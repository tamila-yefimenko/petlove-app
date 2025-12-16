import { ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export interface RestrictedRouteProps {
  children: ReactElement;
  redirectTo?: string;
}

const RestrictedRoute = ({
  children,
  redirectTo = "/",
}: RestrictedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default RestrictedRoute;
