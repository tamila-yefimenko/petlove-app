import "./App.css";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, lazy } from "react";
import { refreshThunk } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const NewsPage = lazy(() => import("../../pages/NewsPage/NewsPage"));
const NoticesPage = lazy(() => import("../../pages/NoticesPage/NoticesPage"));
const FriendsPage = lazy(() => import("../../pages/FriendsPage/FriendsPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));
const AddPetPage = lazy(() => import("../../pages/AddPetPage/AddPetPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Suspense fallback={<h2>Loading...</h2>}>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-pet" element={<AddPetPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
