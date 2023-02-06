import AuthorizationPage from 'pages/authorization-page/AuthorizationPage';
import PostsPage from 'pages/posts-page/PostsPage';
import UserPage from 'pages/user-page/UserPage';
import React from 'react';
import { Route, Routes } from 'react-router';
import MiniDrawer from './components/UI/BaseLayout';
import { ROUTHES } from './constants/constants';
import MainPage from './pages/main-page/MainPage';
import RegistrationPage from './pages/registration-page/RegistrationPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTHES.HOME_PAGE} element={<MiniDrawer />}>
        <Route path={ROUTHES.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTHES.AUTHORIZATION} element={<AuthorizationPage />} />
        <Route path={ROUTHES.HOME_PAGE} element={<MainPage />} />
        <Route path={ROUTHES.USER} element={<UserPage />} />
        <Route path={ROUTHES.POSTS} element={<PostsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
