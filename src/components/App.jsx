import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import  PrivateRoute from "./Routes/PrivateRoute";
import  RestrictedRoute  from "./Routes/RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() => import("../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


  return isRefreshing ? (
    <p>Refreshing user...</p>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <ContactsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <LoginPage />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<p>404: Page Not Found</p>} />
      </Routes>
    </Suspense>
  );
}

export default App;