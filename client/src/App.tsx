import { RequireAuth } from 'containers/RequireAuth/RequireAuth';
import AuthorizationPage from 'pages/authorization-page/AuthorizationPage';
import PostsPage from 'pages/posts-page/PostsPage';
import UserPage from 'pages/user-page/UserPage';
import UsersPage from 'pages/users-page/UsersPage';
import React from 'react';
import { Route, Routes } from 'react-router';
import MiniDrawer from './components/UI/BaseLayout';
import { ROUTES } from './constants/constants';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME_PAGE} element={<MiniDrawer />}>
        <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTES.AUTHORIZATION} element={<AuthorizationPage />} />
        <Route path={ROUTES.HOME_PAGE} element={<MainPage />} />
        <Route path={ROUTES.USER} element={<UserPage />} />
        <Route
          path={ROUTES.POSTS}
          element={
            <RequireAuth>
              <PostsPage />
            </RequireAuth>
          }
        />
        <Route path={ROUTES.USERS} element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
