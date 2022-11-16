import { FC } from 'react';
import { Board } from 'pages/Board';
import { Boards } from 'pages/Boards';
import { NotFound } from 'pages/NotFound';
import { Profile } from 'pages/Profile';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Welcome } from 'pages/Welcome';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutesPath } from 'constants/routes';
import TestPage from 'pages/TestPage';

export const Main: FC = () => {
  return (
    <main className=" min-h-[calc(100vh-100px-80px)]">
      <Routes>
        <Route index path={RoutesPath.WELCOME} element={<Welcome />} />
        <Route path={RoutesPath.SIGN_IN} element={<SignIn />} />
        <Route path={RoutesPath.SIGN_UP} element={<SignUp />} />
        <Route path={RoutesPath.BOARDS} element={<Boards />} />
        <Route path={RoutesPath.BOARD} element={<Board />} />
        <Route path={RoutesPath.PROFILE} element={<Profile />} />
        <Route path={RoutesPath.NOT_FOUND} element={<NotFound />} />

        <Route path={'/test'} element={<TestPage />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </main>
  );
};
