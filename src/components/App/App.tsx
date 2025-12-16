import "./App.css";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import { Suspense, useEffect, lazy } from "react";
import { refreshThunk } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage")
);
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage"));
const NoticesPage = lazy(() => import("../../pages/NoticesPage/NoticesPage"));
const FriendsPage = lazy(() => import("../../pages/FriendsPage/FriendsPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const AddPetPage = lazy(() => import("../../pages/AddPetPage/AddPetPage"));
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Suspense fallback={<h2>Loading...</h2>}>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/login"
              element={
                <RestrictedRoute>
                  <LoginPage />
                </RestrictedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute>
                  <RegistrationPage />
                </RestrictedRoute>
              }
            />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-pet"
              element={
                <PrivateRoute>
                  <AddPetPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </>
    </Suspense>
  );
};

export default App;
